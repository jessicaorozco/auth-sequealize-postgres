const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthService = require('../sequelize/auth.service');
const service = new AuthService();

const { config } = require('../config/config');


const router = express.Router();

router.post('/login',
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: 3,
        role: 'admin'
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
