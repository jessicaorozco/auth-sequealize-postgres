const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Marta22916248'
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
