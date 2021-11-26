const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNzc5NDEzMH0.xm9JfWI_GJlxiuQmL-8iKjMyifaQR2ViTn7rfy379Xg'
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
