const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const id = Joi.number().integer();
const title = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  title: title,
  price: price,
  image: image,
  description: description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: price_max.required(),
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
