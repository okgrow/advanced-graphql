import React from 'react';
import { Query } from 'react-apollo';

import Routes from './Routes';
import getPlacesQuery from '../graphql/getPlaces.query.gql';

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
  </div>
);

export default App;
