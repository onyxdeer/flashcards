const Sequelize = require('sequelize');
const db = require('../scripts/connect.js');
const Bento = require('./bentos.js');
const Nori = require('./noris.js');

const BentoNori = db.define('bentoNori', {
  bento_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Bento,
      key: 'id',
    },
  },
  nori_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Nori,
      key: 'id',
    },
  },
});

module.exports = BentoNori;
