import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import passport from 'passport';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import { Place, Location, User } from '../model';
import { seedDb } from '../model/utils';

import authenticate from './authenticate';

const {
  PORT,
  WS_PORT = parseInt(PORT, 10) + 1,
  MONGO_PORT = parseInt(PORT, 10) + 2,
  MONGO_URL = `mongodb://localhost:${MONGO_PORT}/database`,
} = process.env;

const startServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const db = await MongoClient.connect(MONGO_URL);

  await seedDb({ db, Place, User /*, reset: true*/ });

  const server = express();

  server.use(cors());

  server.use(bodyParser.json());

  server.use((req, res, next) => {
    req.context = {
      Place: new Place({ db }),
      User: new User({ db }),
      Location: new Location(),
    };
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
    })
  );

  server.listen(PORT, () => {
    console.log(
      `GraphQL API endpoint: http://localhost:${PORT}/graphql
Explore it at http://localhost:${PORT}/graphiql`
    );
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
