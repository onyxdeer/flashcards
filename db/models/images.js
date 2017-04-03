const Sequelize = require('sequelize');
const db = require('../index.js');
const Bento = require('./bentos.js');
const Nori = require('./noris.js');

const Image = db.define('image', {
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

module.exports = Image;
