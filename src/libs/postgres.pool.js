
const { Pool} = require ("pg");

	const pool = new Pool({
		host: "localhost",
    user: 'postgres',
    password: 'Marta22916248',
    database: "dbstore",
		connectionLimit: 10,
	});
	console.log("Connected to dbstore POSTGRES",);

module.exports = pool;

