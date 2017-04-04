const Sequelize = require('sequelize');
const db = require('./connect.js');
const createTables = require('./createtables.js');

// Initialize database
module.exports = function() {
  return db.authenticate()
    .then((err) => console.log('Connection to database has been established successfully.'))
    .then(function(err) {
      return createTables()
        .then(console.log('Created tables successfully.'));
    })
    .catch((err) => console.log('Unable to connect to database:', err));
};