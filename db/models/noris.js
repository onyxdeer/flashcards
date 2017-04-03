const Sequelize = require('sequelize');
const db = require('../connect.js');

const Nori = db.define('nori', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  text: Sequelize.TEXT,
  front: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Nori;