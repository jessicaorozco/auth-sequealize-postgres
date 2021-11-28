const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:'3903b06da07db175a3212c6be24d1b712b8c548bf3e2f62c0799bac2b80a64f9'
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});



module.exports = JwtStrategy;
