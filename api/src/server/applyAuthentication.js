import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jwt-simple';
import nodeify from 'nodeify';

const KEY = '0.2609809758287578';

async function userFromPayload(request, jwtPayload) {
  if (!jwtPayload.userId) {
    throw new Error('No userId in JWT');
  }

  return await request.context.User.findOneById(jwtPayload.userId);
}

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey: KEY,
      passReqToCallback: true,
    },
    (request, jwtPayload, done) => {
      nodeify(userFromPayload(request, jwtPayload), done);
    },
  ),
);

export default function addPassport(app) {
  app.use(passport.initialize());

  app.post('/graphql', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      req.currentUser = user || null;
      next();
    })(req, res, next);
  });

  app.post('/login', async (req, res, next) => {
    try {
      const { username } = req.body;

      if (!username) {
        throw new Error('Username not set on request');
      }

      const user = await req.context.User.collection.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const payload = {
        userId: user._id.toString(),
      };

      const token = jwt.encode(payload, KEY);
      res.status(200);
      res.json({ token });
    } catch (e) {
      res.status(400);
      res.json({ error: e.message });
    }
  });
}
