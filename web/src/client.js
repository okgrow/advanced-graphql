import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import Cache from 'apollo-cache-inmemory';
import App from './components/App';

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('AUTH_TOKEN');

  operation.setContext(() => ({
    headers: {
      authorization: token ? `JWT ${token}` : null,
    },
  }));

  return forward(operation);
});

// http://localhost:8080 is put behind a proxy by webpack (cors)
const uri = '/graphql';

const link = authLink.concat(new HttpLink({ uri }));

const cache = new Cache();

const client = new ApolloClient({
  link,
  cache,
});

export default () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
