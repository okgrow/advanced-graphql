import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './components/App';

// http://localhost:8080 is put behind a proxy by webpack (cors)
const uri = '/graphql';

const link = new HttpLink({ uri });

const cache = new InMemoryCache();

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
