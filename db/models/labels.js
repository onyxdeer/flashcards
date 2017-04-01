const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')

const Label = sequelize.define('label', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  bento_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Bento,
      key: 'id'
    }
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});