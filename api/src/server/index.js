import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import { Place, Location, User } from '../model';
import { seedDb } from '../model/utils';

import applyAuthentication from './applyAuthentication';

const PORT = 4000;

const {
  WS_PORT = parseInt(PORT, 10) + 1,
  MONGO_PORT = parseInt(PORT, 10) + 2,
  MONGO_URL = `mongodb://localhost:${MONGO_PORT}/database`,
  ENGINE_API_KEY,
} = process.env;

const startServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const db = await MongoClient.connect(MONGO_URL);

  await seedDb({ db, Place, User /*, reset: true*/ });

  const app = express();

  app.use(cors());

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    req.context = {
      Place: new Place({ db }),
      User: new User({ db }),
      Location: new Location(),
    };
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
  });

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`GraphQL API endpoint: http://localhost:${PORT}/graphql`);
  });
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
