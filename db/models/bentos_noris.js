const Sequelize = require('sequelize');
const db = require('../connect.js');
const Bento = require('./bentos.js');
const Nori = require('./noris.js');

const Bento_nori = db.define('bento_nori', {
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

module.exports = Bento_nori;