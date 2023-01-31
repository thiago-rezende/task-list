const jwt = require("./jwt");
const server = require("./server");
const database = require("./database");
const password = require("./password");

/* application configuration */
module.exports = {
  jwt,
  server,
  database,
  password,
};
