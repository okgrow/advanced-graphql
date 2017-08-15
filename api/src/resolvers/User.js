const resolvers = {
  Query: {
    users(parent, { lastCreatedAt, limit }, { User }) {
      return User.all({ lastCreatedAt, limit });
    },
    currentUser(parent, args, { currentUser }) {
      return currentUser;
    },
  },
  Mutation: {
    async createUser(parent, { input: { username } }, { User }) {
      if (await User.collection.findOne({ username })) {
        throw new Error('User already exists!');
      }

      const id = await User.insert({ username });
      return User.findOneById(id);
    },

    async updateUser(parent, { id, input }, { User }) {
      await User.updateById(id, input);
      return User.findOneById(id);
    },

    removeUser(parent, { id }, { User }) {
      return User.removeById(id);
    },
  },
  Place: {
    user: (place, args, context) => {
      return context.User.findOneById(place.userId);
    },
  },
};

export default resolvers;
