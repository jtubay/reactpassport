const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExractJWT = require("passport-jwt").ExractJwt;

const db = require('../models')

passport.use(
  new JwtStrategy({
      jwtFromRequest: ExractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      issuer: 'accounts.examplesoft.com',
      audience: 'yoursite.net'
  },
  (jwt_payload, done) => {
    db.User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
