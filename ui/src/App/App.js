import React from 'react';
import { Query, Subscription } from 'react-apollo';

import Routes from './Routes';
import getPlacesQuery from '../graphql/getPlaces.query.gql';
import updateplaceSubcription from './updatePlace.subscription.gql';

import Loading from './Loading';
import Error from './Error';

import './styles';

const App = () => (
  <div>
    <Query query={getPlacesQuery}>
      {graphqlResponse => {
        const { data, loading, error } = graphqlResponse;
        if (loading) return <Loading />;
        if (error) return <Error />;
        return <Routes places={data.places} />;
      }}
    </Query>

    <Subscription subscription={updateplaceSubcription} />
  </div>
);

export default App;
