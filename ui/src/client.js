import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App/App';

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('AUTH_TOKEN');

  operation.setContext(() => ({
    headers: {
      authorization: token ? `JWT ${token}` : null,
    },
  }));

  return forward(operation);
});

const hasSubscriptionOperation = operation =>
  operation.query.definitions.reduce(
    (result, definition) => result || definition.operation === 'subscription',
    false
  );

const link = authLink.split(
  hasSubscriptionOperation,
  new WebSocketLink({
    uri: 'ws://localhost:8081/graphql',
    options: { reconnect: true },
  }),
  new HttpLink({ uri: 'http://localhost:8080/graphql' })
);

// create an InMemoryCache to store GraphQL operations results
const cache = new InMemoryCache();

// create an ApolloClient using the link & the cache you created above
const client = new ApolloClient({
  link,
  cache,
});

// wrap the BrowserRouter in an ApolloProvider using the client you created above
export default () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
