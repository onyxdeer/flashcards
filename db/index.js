const Sequelize = require('sequelize');
const db = require('./connect.js');
const createTables = require('./createtables.js');
// const seed = require('./seed.js');

// Initiate database
module.exports = function() {
  return db.authenticate()
  .then((err) => console.log('Connection to database has been established successfully.'))
  .then(function(err) {
    return createTables()
    .then(console.log('Created tables successfully.'));
  })
  // .then(function(err) {
  //   return seed()
  //   .then(console.log('Seeded test data successfully.'));
  // })
  .catch((err) => console.log('Unable to connect to database:', err));
};