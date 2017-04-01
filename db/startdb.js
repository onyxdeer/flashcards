const Sequelize = require('sequelize');
const db = new Sequelize('flashcardsDB', 'root', '', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    });

db.authenticate()
  .then(function(err) {
    console.log('Connection to database has been established successfully.')
    return db.sync()
  })
  .then(function(err){
    console.log('Created tables successfully')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })

module.exports = db