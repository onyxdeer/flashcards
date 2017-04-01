const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')

const Image = sequelize.define('image', {
  url: Sequelize.STRING,
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