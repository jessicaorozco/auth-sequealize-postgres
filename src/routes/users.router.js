const express = require('express');
const passport = require('passport');
const UserService = require('./../sequelize/user.service');
const service = new UserService();

const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema, updateResetPassword } = require('./../schemas/user.schema');
const authHandler = require('../middlewares/auth.handler');
const { boomify } = require('@hapi/boom');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await service.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
passport.authenticate('jwt', {session: false}),
validatorHandler(updateResetPassword, 'body'),
  async (req, res, next) => {
    try {
      const {token, newPassword} = req.body
      let rta = await service.changePassword(token, newPassword)
      return rta
    } catch (error) {
      next(error);
    }finally {
      next()
    }
  }
);
module.exports = router;

