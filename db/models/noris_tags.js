const Sequelize = require('sequelize');
const db = require('../connect.js');
const Tag = require('./tags.js');
const Nori = require('./noris.js');

const NoriTag = db.define('noriTag', {
  nori_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Nori,
      key: 'id',
    },
  },
  tag_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
  },
});

module.exports = NoriTag;
