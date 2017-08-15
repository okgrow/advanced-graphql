import React from 'react';
import { Mutation } from 'react-apollo';

import updatePlaceMutation from './updatePlace.mutation.gql';
import PlaceView from './PlaceView';

const Place = ({ place }) => (
  <Mutation
    key={place.id}
    mutation={updatePlaceMutation}
    optimisticResponse={{
      updatePlace: { ...place, visited: !place.visited },
    }}
  >
    {updatePlace => {
      const toggleVisited = id => {
        updatePlace({
          variables: {
            input: { id, visited: !place.visited },
          },
        });
      };
      return <PlaceView place={place} toggleVisited={toggleVisited} />;
    }}
  </Mutation>
);

export default Place;
