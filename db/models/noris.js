const Sequelize = require('sequelize');
const db = require('../connect.js');

const Nori = db.define('nori', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: Sequelize.STRING,
  text_front: Sequelize.TEXT,
  text_back: Sequelize.TEXT,
  audio_url_front: Sequelize.STRING,
  audio_url_back: Sequelize.STRING,
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Nori;