const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')

const Bento = sequelize.define('bentos', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  nori_count: Sequelize.INTEGER,
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
});