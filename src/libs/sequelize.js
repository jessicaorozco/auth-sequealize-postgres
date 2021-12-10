const { boom } = require('@hapi/boom');
const { Sequelize } = require('sequelize');

const config  = require('../config/config');
const setupModels = require('./../db/models');

const URI = process.env.DATABASE_URL;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: true,
  dialectOptions: {
      rejectUnauthorized:false

  }
});
setupModels(sequelize);
console.log(`Sequelize succesfull`);

module.exports = sequelize;
