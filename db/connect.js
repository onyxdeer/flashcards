const Sequelize = require('sequelize');

// Set up database connection
const db = new Sequelize('obentoDB', 'root', '', {
  dialect: 'mysql' // or 'sqlite', 'postgres', 'mariadb'
});

module.exports = db;