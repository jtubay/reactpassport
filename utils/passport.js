const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExractJWT = require("passport-jwt").ExractJwt;

passport.use(
  new JwtStrategy({

  },
  (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return document(err, false);
      }
      if (user) {
        return document(null, user);
      } else {
        return document(null, false);
      }
    });
  })
);

module.exports = passport;
