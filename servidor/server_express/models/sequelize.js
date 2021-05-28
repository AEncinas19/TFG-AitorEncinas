
// Load ORM
const Sequelize = require('sequelize');

const url = "sqlite:server.sqlite";

const sequelize = new Sequelize(url);

module.exports = sequelize;
