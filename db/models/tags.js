const Sequelize = require('sequelize');
const db = require('../connect.js');

const Tag = db.define('tag', {
  name: Sequelize.STRING
});

module.exports = Tag;