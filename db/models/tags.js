const Sequelize = require('sequelize');
const db = require('../scripts/connect.js');

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Tag name already exists!',
    },
  },
});

module.exports = Tag;
