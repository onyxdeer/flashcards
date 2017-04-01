const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')


const Bento = sequelize.define('bento', {
  name: Sequelize.STRING,
  created_date: Sequelize.DATE
})