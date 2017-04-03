const Sequelize = require('sequelize');
const db = require('../index.js');

const Tag = db.define('tag', {
  name: Sequelize.STRING
});

module.exports = Tag;