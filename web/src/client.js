import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import WsLink from 'apollo-link-ws';
import Cache from 'apollo-cache-inmemory';
import App from './components/App';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  // could also be sent to an error logger
  console.error('Apollo Errors caught!', { graphqlErrors, networkError });
});

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

// http://localhost:8080 is put behind a proxy by webpack (cors)
const uri = '/graphql';

const link = ApolloLink.from([
  errorLink,
  authLink.split(
    hasSubscriptionOperation,
    new WsLink({
      uri: 'ws://localhost:8081/graphql',
      options: { reconnect: true },
    }),
    new HttpLink({ uri })
  ),
]);

const cache = new Cache();

const client = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_STATE__ || {}),
});

export default () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
