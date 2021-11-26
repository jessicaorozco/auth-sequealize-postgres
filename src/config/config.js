'use strict'

require('dotenv').config();

const config =  {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  dbuser: process.env.USER,
  dbpassword: process.env.PASSWORD,
  dbhost: process.env.HOST,
  dbname: process.env.DATABASE,
  dbport: process.env.DATABASE_PORT,
  dburl: process.env.DATABASE_URL,
  apikey: process.env.TOKEN_SECRET || 'apikey',
  mailmail: process.env.GMAIL_ADDRESS,
  passwordmail: process.env.PASSWORD_EMAIL

}
// console.log(`${config.mailmail} ${config.passwordmail}`);

module.export = config;
