const Sequelize = require('sequelize')
const sequelize = require('../startdb.js')


const Nori = sequelize.define('nori', {
  name: Sequelize.STRING,
  created_date: Sequelize.DATE
})




// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('database', 'root', 'password');

// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE
// });

// sequelize.sync().then(function() {
//   return User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
// }).then(function(jane) {
//   console.log(jane.get({
//     plain: true
//   }));
// });