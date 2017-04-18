const Sequelize = require('sequelize');
const db = require('../connect.js');
const bcrypt = require('bcryptjs');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'Username already exists!',
    },
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
}, {
  classMethods: {
    validPassword: function (user, password) {
      bcrypt.compareSync(password, user.password);
    },
  },
// }, {
//   hooks: {
//     afterValidate: function (user) {
//       user.password = bcrypt.hashSync(user.password, 8);
//     },
//   },
// });
});

module.exports = User;
