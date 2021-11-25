const express = require('express');
const { v4: uuidv4 } = require('uuid');
const UserService = require('./../sequelize/user.service');
const service = new UserService();

const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema, updateResetPassword } = require('./../schemas/user.schema');
const authHandler = require('../middlewares/auth.handler');
const { boomify } = require('@hapi/boom');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
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
validatorHandler(getUserSchema, 'params'),
validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
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

