const Sequelize = require('sequelize');

// Set up database connection
const db = new Sequelize('obentoDB', 'root', '');

module.exports = db;
