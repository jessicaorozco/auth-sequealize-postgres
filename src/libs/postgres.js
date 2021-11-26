const {Client } = require('pg');

async function getConnection() {

const client = new Client ({
  host:'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Marta22916248',
  database: 'dbstore'
});

await client.connect;
return client;

}

module.export = getConnection;
