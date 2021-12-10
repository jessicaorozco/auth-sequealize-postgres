const express = require('express');
const passport = require('passport');
const jwt = require('../utils/auth');
const boom = require('@hapi/boom')
const UserService = require('../sequelize/user.service');
const service = new UserService();
const { config } = require('../config/config');
const validationHandler = require('../middlewares/validator.handler');

const {
  createLoginSchema,
  updateRecoverySchema,
} = require('../schemas/auth.schema');
const router = express.Router();


router.post('/login',
validationHandler(createLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const {email} = req.body
      let rta = await service.getUser(email)
      if(!rta){
        throw boom.unauthorized();
      }
      res.json(rta)
    } catch (error) {
      next(error);
    }

  }
);

router.post('/recovery',
passport.authenticate('jwt', {successRedirect: '/images/'}),
validationHandler(updateRecoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const {email} = req.body
      let rta = await service.sendRecovery(email)
      res.json(rta)
    } catch (error) {
      next(error);
    }
  }
);
router.post('/verify',
  async (req, res, next) => {
    const {email, token} = req.body
    try {
      const user = await service.findByEmail(email);
      if(!user){
        throw boom.notFound()
      }
      let rta = await service.verifyToken(token)
      res.json(rta)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
