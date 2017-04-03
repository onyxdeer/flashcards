const Sequelize = require('sequelize');
const db = require('../connect.js');
const bcrypt = require('bcryptjs');

const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  hooks: {
    afterValidate: function(user) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
  }
});

module.exports = User;
