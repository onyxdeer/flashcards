const Sequelize = require('sequelize');
const db = require('../scripts/connect.js');
const User = require('./users.js');

const Bento = db.define('bento', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id_hash: Sequelize.STRING,
  description: Sequelize.STRING,
  nori_count: Sequelize.INTEGER,
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  visit_count: Sequelize.INTEGER,
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
});

module.exports = Bento;
