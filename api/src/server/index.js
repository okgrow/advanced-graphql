import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { ApolloServer } from 'apollo-server-express';
import { ApolloEngine } from 'apollo-engine';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import passport from 'passport';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import { Place, Location, User } from '../model';
import { seedDb } from '../model/utils';

import applyAuthentication from './applyAuthentication';
import pubsub from './subscriptions';

const PORT = 4000;

const {
  WS_PORT = parseInt(PORT, 10) + 1,
  MONGO_PORT = parseInt(PORT, 10) + 2,
  MONGO_URL = `mongodb://localhost:${MONGO_PORT}/database`,
  ENGINE_API_KEY,
} = process.env;

const startServer = async () => {
  const link = new HttpLink({
    uri: 'https://m505q79pz8.sse.codesandbox.io/',
    fetch,
  });

  const remoteSchema = makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link,
  });

  const localSchema = makeExecutableSchema({ typeDefs, resolvers });
  const linkSchema = `
    extend type Location {
      weather: Weather
    }
`;

  const schema = mergeSchemas({
    schemas: [remoteSchema, localSchema, linkSchema],
    resolvers: {
      Location: {
        weather: {
          fragment:
            'fragment WeatherLocation on Location { longitude latitude }',
          resolve({ longitude, latitude }, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: remoteSchema,
              operation: 'query',
              fieldName: 'weather',
              args: {
                coords: {
                  longitude,
                  latitude,
                },
              },
              context,
              info,
            });
          },
        },
      },
    },
  });

  const db = await MongoClient.connect(MONGO_URL);

  await seedDb({ db, pubsub, Place, User /*, reset: true*/ });

  const app = express();

  const createContext = () => ({
    Place: new Place({ db, pubsub }),
    User: new User({ db, pubsub }),
    Location: new Location(),
  });

  app.use(cors());

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    req.context = createContext();
    next();
  });

  applyAuthentication(app);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      currentUser: req.currentUser || null,
      ...req.context,
    }),

    playground: {
      subscriptionEndpoint: `ws://localhost:${WS_PORT}/graphql`,
      // FUTURE: code below can include an auth header, but it clears the
      // tabs on refresh. There is a PR pending that may help. See:
      // https://github.com/prisma/graphql-playground/pull/825
      // tabs: [
      //   {
      //     endpoint: `http://localhost:${PORT}/graphql`,
      //     query: '',
      //     headers: {
      //       authorization:
      //         'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1YmFiZWZiYzIxYWU0ZTE3YTkwYjZjOTIifQ.NYgCHf-RtP6W6aM37l0a6rcjNO5wn8hVUc2wWa_WRpQ',
      //     },
      //   },
      // ],
    },
    // debug: true,
    tracing: true,
    cacheControl: true,
    engine: false,
  });

  server.applyMiddleware({ app });

  const engine = new ApolloEngine({
    apiKey: ENGINE_API_KEY,
  });

  engine.listen({
    port: PORT,
    expressApp: app,
  });

  // WebSocket server for subscriptions
  const websocketServer = createServer((req, res) => {
    res.writeHead(404);
    res.end();
  });

  websocketServer.listen(WS_PORT, () => {
    console.log(
      `GraphQL Subscriptions endpoint: ws://localhost:${WS_PORT}/graphql`
    );
  });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      // set the context on the websocket connection
      onConnect: createContext,
    },
    {
      server: websocketServer,
      path: '/graphql',
    }
  );
};

startServer()
  .then(() => {
    console.log('All systems go');
  })
  .catch(e => {
    console.error('Uncaught error in startup');
    console.error(e);
    console.trace(e);
  });
