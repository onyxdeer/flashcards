const Sequelize = require('sequelize');
const db = require('../connect.js');

const Url = db.define('nori', {
  base_url: Sequelize.STRING,
  shortened_url: Sequelize.STRING
  bento_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Bento,
      key: 'id'
    }
  },
});

module.exports = Url;