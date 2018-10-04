import React from 'react';
import { Query, Subscription } from 'react-apollo';

import Routes from './Routes';
import getPlacesQuery from '../graphql/getPlaces.query.gql';
import updateplaceSubcription from './updatePlace.subscription.gql';
import createPlaceSubcription from './createPlace.subscription.gql';

import Loading from './Loading';
import Error from './Error';

import './styles';

const App = () => (
  <div>
    <Query query={getPlacesQuery}>
      {graphqlResponse => {
        const { data, loading, error, subscribeToMore } = graphqlResponse;
        if (loading) return <Loading />;
        if (error) return <Error />;
        subscribeToMore({
          document: createPlaceSubcription,
          updateQuery: (prev, { subscriptionData }) => {
            const { placeCreated } = subscriptionData.data;
            if (!placeCreated) {
              return prev;
            }

            // Check to see if the addPlace mutation already added our place.
            // Note: Mutation & sub can happen in either order, so you have to check in
            // the mutation update function as well!
            if (prev.places.find(place => place.id === placeCreated.id)) {
              return prev;
            }

            // If not, append the new place to the collection.
            return {
              ...prev,
              places: [...prev.places, placeCreated],
            };
          },
        });
        return <Routes places={data.places} />;
      }}
    </Query>

    <Subscription subscription={updateplaceSubcription} />
  </div>
);

export default App;
