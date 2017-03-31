var Sequelize = require('sequelize');
var db = new Sequelize('flashcards', 'root', '', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    });

db.authenticate()
  .then(function(err) {
    console.log('Connection to database has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });