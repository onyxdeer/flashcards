const Sequelize = require('sequelize');
const sequelize = require('../startdb.js');

const Category = sequelize.define('category', {
  name: Sequelize.INTEGER
});