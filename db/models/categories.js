const Sequelize = require('sequelize');
const db = require('../connect.js');
const Bento = require('./bentos.js');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Category name already exists!'
    }
  }
});

module.exports = Category;

