const knexfile = require("../knexfile");

const knexConnector = require("knex");

module.exports = knexConnector(knexfile.development);
