const Sequelize = require('sequelize');
const sequelize = require('../startdb.js');

const Follow = sequelize.define('follow', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  follow_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});