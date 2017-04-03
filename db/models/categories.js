const Sequelize = require('sequelize');
const db = require('../index.js');
const Bento = require('./bentos.js');

const Category = db.define('category', {
  name: Sequelize.STRING,
});

module.exports = Category;

