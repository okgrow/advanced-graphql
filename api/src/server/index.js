import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import passport from 'passport';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import { Place, Location, User } from '../model';
import { seedDb } from '../model/utils';

import authenticate from './authenticate';
import pubsub from './subscriptions';

const {
  PORT,
  WS_PORT = parseInt(PORT, 10) + 1,
  MONGO_PORT = parseInt(PORT, 10) + 2,
  MONGO_URL = `mongodb://localhost:${MONGO_PORT}/database`,
} = process.env;

const startServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const db = await MongoClient.connect(MONGO_URL);

  const createContext = () => ({
    Place: new Place({ db, pubsub }),
    User: new User({ db, pubsub }),
    Location: new Location(),
  });

  await seedDb({ db, pubsub, Place, User /*, reset: true*/ });

  const server = express();

  server.use(cors());

  server.use(bodyParser.json());

  server.use((req, res, next) => {
    req.context = createContext();
    next();
  });

  authenticate(server);

  server.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      graphqlExpress(() => ({
        schema,
        context: {
          currentUser: user || null,
          ...req.context,
        },
        debug: true,
      }))(req, res, next);
    })(req, res, next);
  });

  server.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      passHeader: "authorization: 'JWT '+ localStorage['AUTH_TOKEN']",
      subscriptionsEndpoint: `ws://localhost:${WS_PORT}/graphql`,
    })
  );

  server.listen(PORT, () => {
    console.log(
      `GraphQL API endpoint: http://localhost:${PORT}/graphql
Explore it at http://localhost:${PORT}/graphiql`
    );
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
