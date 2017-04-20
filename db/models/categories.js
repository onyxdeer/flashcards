const Sequelize = require('sequelize');
const db = require('../connect.js');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Category name already exists!',
    },
  },
});

module.exports = Category;

