const { Client } = require("pg");

function getDatabaseConnection() {
  client = new Client({
    connectionString: process.env.CI
      ? process.env.CI_DB_CONNECTION_STRING
      : process.env.DB_CONNECTION_STRING,
  });
  client.connect();
  return client;
}

module.exports = {
  getDatabaseConnection,
};
