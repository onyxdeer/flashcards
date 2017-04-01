const Sequelize = require('sequelize')
const sequelize = require('../startdb.js')

const Nori = sequelize.define('nori', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  text: Sequelize.TEXT,
  front: Sequelize.BOOLEAN,
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },  
  tag_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Hashtag,
      key: 'id'
    }
  }
});

// sequelize.sync()
//   .then(function() {
//     Nori.create({
//       name: 'Eric\'s Cards',
//       description: 'These are Eric\'s cards',
//       text: "" 
//     });
//   });


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