const Sequelize = require('sequelize');
const sequelize = new Sequelize('obentoDB', 'root', '', {
  dialect: 'mysql' // or 'sqlite', 'postgres', 'mariadb'
});


// sequelize.authenticate()
//   .then(function(err) {
//     console.log('Connection to database has been established successfully.')
//     return db.sync()
//   })
//   .then(function(err){
//     console.log('Created tables successfully')
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err)
//   });

module.exports = sequelize;