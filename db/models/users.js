const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../scripts/connect.js');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'Username already exists!',
    },
  },
  password: Sequelize.STRING,
}, {
  classMethods: {
    validPassword: (user, password) => {
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
