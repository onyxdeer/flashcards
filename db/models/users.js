const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')


const User = sequelize.define('user', {
  name: Sequelize.STRING,
  created_date: Sequelize.DATE
})