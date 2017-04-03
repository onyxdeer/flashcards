const Sequelize = require('sequelize');

const db = new Sequelize('obentoDB', 'root', '', {
  dialect: 'mysql' // or 'sqlite', 'postgres', 'mariadb'
});

db.authenticate()
  .then(function(err) {
    console.log('Connection to database has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to database:', err);
  });

module.exports = db;