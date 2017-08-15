const resolvers = {
  Query: {
    locationSuggestion: (parent, { name }, { Location }) => Location.get(name),
  },
  Place: {
    location: (place, args, { Location }) => Location.get(place.address),
  },
};

export default resolvers;
