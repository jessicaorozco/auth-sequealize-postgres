const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8).max(15);

const createLoginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const updateLoginSchema = Joi.object({
  email: email,
  password: password
});

const updateRecoverySchema = Joi.object({
  email:email
})

module.exports = { createLoginSchema, updateLoginSchema, updateRecoverySchema}
