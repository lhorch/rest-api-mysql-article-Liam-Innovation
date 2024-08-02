// const mysql = require("mysql2/promise");
const config = require("../config");
const mysql = require("promise-mysql");

async function query(sql, params) {
  // const connection = await mysql.createConnection(config.db);
  const connection = await createTcpPool();
  const result = await connection.query(sql, params);

  return result;
}

// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of MySQL.
const createTcpPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const dbConfig = {
    socketPath: process.env.SOCKET_PATH, // e.g. '127.0.0.1'
    // port: process.env.DB_PORT, // e.g. '3306'
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return mysql.createPool(dbConfig);
};

module.exports = {
  query,
};
