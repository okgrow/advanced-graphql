import React from 'react';
import { Mutation } from 'react-apollo';

import createPlaceMutation from './createPlace.mutation.gql';
import getPlacesQuery from '../../../graphql/getPlaces.query.gql';

import Input from './Input';

const AddPlace = () => (
  <Mutation
    mutation={createPlaceMutation}
    update={(cache, { data: { createPlace } }) => {
      const { places } = cache.readQuery({
        query: getPlacesQuery,
      });
      // Check for whether a subscription may have already added
      // the place. You have to check in both update functions (this
      // update function and the subscription's updateQueries function)!
      // Either update might fire first depending on network, etc.
      if (!places.find(place => place.id === createPlace.id)) {
        cache.writeQuery({
          query: getPlacesQuery,
          data: { places: places.concat([createPlace]) },
        });
      }
    }}
  >
    {addPlace => {
      const addPlaceWithAddress = address =>
        addPlace({
          variables: { input: { address } },
          optimisticResponse: {
            createPlace: { ...optimisticResponseBase, address },
          },
        });
      return <Input addPlace={addPlaceWithAddress} />;
    }}
  </Mutation>
);

const optimisticResponseBase = {
  __typename: 'Place',
  id: 'optimistic-place',
  visited: false,
  location: {
    __typename: 'Location',
    id: 'optimistic-location',
    latitude: 0,
    longitude: 0,
    weather: {
      __typename: 'Weather',
      id: 'optimistic-weather',
      icon: '',
      temperature: null,
    },
  },
  user: {
    __typename: 'User',
    id: 'optimistic-user',
    username: '', // keeping it simple - we should populate the real user here
  },
};

export default AddPlace;
