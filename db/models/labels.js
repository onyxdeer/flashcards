const Sequelize = require('sequelize');
const db = require('../connect.js');
const User = require('./users.js');
const Bento = require('./bentos.js');

const Label = db.define('label', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  bento_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Bento,
      key: 'id',
    },
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Label;
