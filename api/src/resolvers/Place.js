const resolvers = {
  Query: {
    places: (parent, args, { Place }) => {
      return Place.all({});
    },
  },
  Mutation: {
    createPlace: async (
      parent,
      { input: { address } },
      { Place, currentUser }
    ) => {
      if (!currentUser) {
        throw new Error('Sorry, you need to be logged in to create a place!');
      }

      const doc = {
        address,
        visited: false,
        userId: currentUser.id,
      };

      const insertedId = await Place.insert(doc);

      const newPlace = await Place.findOneById(insertedId);

      return newPlace;
    },
    updatePlace: async (
      parent,
      { input: { id, visited } },
      { Place, currentUser }
    ) => {
      if (!currentUser) {
        throw new Error('Sorry, you need to be logged in to update a place!');
      }

      const doc = await Place.findOneById(id);

      if (doc.userId !== currentUser.id) {
        return {
          errors: [
            { message: "Hey, it's not your place!" }
          ]
        }
      }

      await Place.updateById(id, {
        ...doc,
        visited,
      });

      const updatedPlace = await Place.findOneById(id);

      return { place: updatedPlace, errors: [] };
    },
  },
  Subscription: {
    placeCreated: {
      subscribe: (parent, args, { Place }) =>
        Place.pubsub.asyncIterator('placeCreated'),
    },
    placeUpdated: {
      subscribe: (parent, args, { Place }) =>
        Place.pubsub.asyncIterator('placeUpdated'),
    },
  },
};

export default resolvers;
