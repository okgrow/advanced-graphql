const resolvers = {
  Query: {
    locationSuggestion: (root, { name }, { Location }) => Location.get(name),
  },
  Place: {
    location: (place, args, { Location }) => Location.get(place.name),
  },
};

export default resolvers;
