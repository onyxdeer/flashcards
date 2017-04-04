const Sequelize = require('sequelize');
const db = require('../connect.js');
const Bento = require('./bentos.js');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Category;

