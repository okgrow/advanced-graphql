import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './components/App';

// create an HttpLink to connect to the GraphQL API: the uri is http://localhost:8080/graphql
// -- edit here

// create an InMemoryCache to store GraphQL operations results
// -- edit here

// create an ApolloClient using the link & the cache you created above
// -- edit here

// wrap the BrowserRouter in an ApolloProvider using the client you created above
export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
