require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  env: process.env.NODE_ENV || 'prod',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  DbUrl: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  TOKEN_SECRET: process.env.TOKEN_SECRET || "access-token",
  mailMail: process.env.GMAIL_ADDRESS,
  passwordMail: process.env.PASSWORD_EMAIL

}

module.export = config
