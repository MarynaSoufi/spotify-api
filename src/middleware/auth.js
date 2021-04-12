// imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';

//init dotenv 
dotenv.config();

// initialise passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// define options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

// use passport
passport.use(
  new JwtStrategy(opts, async (jwtData, done) => {
    try {
     console.info(`${jwtData.name} does an authenticated request`);
      return done(null, jwtData);
    } catch (error) {
      done(null, error);
    }
  })
);

export default (req, res, next) => {
  //condotions so that you can add a new user and watch all songs without authenticateion
  if ((req.method == 'POST' &&  req.url.startsWith('/users')) || (req.method == 'GET' &&  req.url.startsWith('/songs'))) {
    next();
  }else {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      req.userId = user.id;
      req.role = user.isAdmin;
      //conditions so that only the admin can manage the "songs" table in the database and so that only a logged in user can perform actions
      if (error || !user || (req.method != 'GET' && req.url.startsWith ('/songs') && !user.isAdmin)) {
        console.error(info);
        res.status(401).send(info);
      } else {
        next();
      }
    })(req, res, next);
  }
};