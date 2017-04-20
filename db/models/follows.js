const Sequelize = require('sequelize');
const db = require('../connect.js');
const User = require('./users.js');

const Follow = db.define('follow', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  follow_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Follow;
