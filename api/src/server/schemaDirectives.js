import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAuthorizedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // Get the field's resolver, use default resolver if it doesn't have one
    const { resolve = defaultFieldResolver } = field;

    // set the field resolver to our custom function...
    field.resolve = async (...args) => {
      const [, fieldArguments, context] = args;
      const { Place, currentUser } = context;
      const {
        input: { id },
      } = fieldArguments;

      const doc = await Place.findOneById(id);

      console.log('currentUser, doc', currentUser, doc);

      if (doc.userId !== currentUser.id) {
        return {
          errors: [{ message: "Hey, it's not your place!" }],
        };
      }

      // else return the value...
      return resolve.apply(this, args);
    };
  }
}

export default {
  isAuthorized: IsAuthorizedDirective,
};
