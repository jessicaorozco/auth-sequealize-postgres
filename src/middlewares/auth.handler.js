const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

async function verifyToken () {
const secret = config.apiKey;
const token = req.body

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);

}

function checkApiKey(req, res, next) {
  const apiKey = req.headers['apikey'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}


function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}



module.exports = { checkApiKey, checkAdminRole, checkRoles }
