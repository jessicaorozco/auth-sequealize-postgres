const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthService = require('../sequelize/auth.service');
const service = new AuthService();

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
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, 'jessdark');
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
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

module.exports = router;
