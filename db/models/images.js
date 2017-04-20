const Sequelize = require('sequelize');
const db = require('../connect.js');
const Bento = require('./bentos.js');
const Nori = require('./noris.js');

const Image = db.define('image', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nori_front: Sequelize.BOOLEAN,
  nori_back: Sequelize.BOOLEAN,
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

module.exports = Image;
