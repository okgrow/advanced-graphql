import React from 'react';
import { Mutation } from 'react-apollo';

import updatePlaceMutation from './updatePlace.mutation.gql';
import PlaceView from './PlaceView';

const Place = ({ place }) => (
  <Mutation
    key={place.id}
    mutation={updatePlaceMutation}
    optimisticResponse={{
      updatePlace: {
        __typename: 'UpdatePlaceResponse',
        place: { ...place, visited: !place.visited },
        errors: [],
      },
    }}
  >
    {(updatePlace, { data }) => {
      const toggleVisited = id => {
        updatePlace({
          variables: {
            input: { id, visited: !place.visited },
          },
        });
      };

      if (data && data.updatePlace.errors.length) {
        data.updatePlace.errors.forEach(({ message }) => alert(message));
      }

      return <PlaceView place={place} toggleVisited={toggleVisited} />;
    }}
  </Mutation>
);

export default Place;
