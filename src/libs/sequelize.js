const { boom } = require('@hapi/boom');
const { Sequelize } = require('sequelize');

const config  = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = 'postgres://postgres:Marta22916248@localhost:5432/dbstore'

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});
setupModels(sequelize);
console.log(`Sequelize succesfull`);

module.exports = sequelize;
