const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')

const Bento_nori = sequelize.define('bento_nori', {
  bento_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Bento,
      key: 'id'
    }
  },
  nori_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Nori,
      key: 'id'
    }
  }
});