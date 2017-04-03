const Sequelize = require('sequelize');
const db = require('../index.js');
const Tag = require('./tags.js');
const Nori = require('./noris.js');

const Nori_tag = db.define('nori_tag', {
  nori_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Nori,
      key: 'id'
    }
  },
  tag_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  }
});

module.exports = Nori_tag;