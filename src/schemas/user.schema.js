const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5)
const recoverytoken = Joi.string().min(10)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  role: role
});

const updateResetPassword = Joi.object({
  recoverytoken: recoverytoken.required()
});


const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, updateResetPassword }
