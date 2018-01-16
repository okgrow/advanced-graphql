const resolvers = {
  Query: {
    places: (root, args, { Place }) => {
      return Place.all({});
    },
  },
  Mutation: {
    createPlace: async (_, { input: { address } }, { Place, currentUser }) => {
      if (!currentUser) {
        throw new Error('Sorry, you need to be logged in to create a place!');
      }

      const doc = {
        name: address,
        visited: false,
        userId: currentUser.id,
      };

      const insertedId = await Place.insert(doc);

      const newPlace = await Place.findOneById(insertedId);

      return newPlace;
    },
    updatePlace: async (
      _,
      { input: { id, visited } },
      { Place, currentUser }
    ) => {
      if (!currentUser) {
        throw new Error('Sorry, you need to be logged in to update a place!');
      }

      const doc = await Place.findOneById(id);

      if (doc.userId !== currentUser.id) {
        throw new Error("Hey, it's not your place!");
      }

      await Place.updateById(id, {
        ...doc,
        visited,
      });

      const updatedPlace = await Place.findOneById(id);

      return updatedPlace;
    },
  },
  Subscription: {
    placeCreated: {
      subscribe: (root, args, { Place }) =>
        Place.pubsub.asyncIterator('placeCreated'),
    },
    placeUpdated: {
      subscribe: (root, args, { Place }) =>
        Place.pubsub.asyncIterator('placeUpdated'),
    },
  },
};

export default resolvers;
