import fs from 'fs';

const requireGraphQL = name => {
  const filename = require.resolve(name);
  return fs.readFileSync(filename, 'utf8');
};

const typeDefs = [
  `
  type Query {
    # A placeholder, please ignore
    placeholder: Int
  }
  type Mutation {
    # A placeholder, please ignore
    placeholder: Int
  }
  type Subscription {
    # A placeholder, please ignore
    placeholder: Int
  }
`,
];

typeDefs.push(requireGraphQL('./Location.graphql'));
typeDefs.push(requireGraphQL('./Place.graphql'));
typeDefs.push(requireGraphQL('./User.graphql'));

export default typeDefs;
