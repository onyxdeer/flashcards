const Sequelize = require('sequelize');
const sequelize = require('../startdb.js');
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  hooks: {
    afterValidate: function(user) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
  }
});

// Sync creates table
// Since creating table may take long time, create entry in callback function
sequelize.sync({logging: console.log})
  .then(function() {
    User.create({
      username: 'saungchi',
      password: 'saungchipassword',
    });
  })
  .catch(function(err) {
    console.log(err);
  });

// Sequelize will automatically add the columns id, createdAt and updatedAt. createdAt and updatedAt are controlled by sequelize - when you create a model through sequelize createdAt will be set, and whenever you call updateAttributes / save on a model, updatedAt will be set.