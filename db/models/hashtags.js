const Sequelize = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../startdb.js')

const Hashtag = sequelize.define('hashtag', {
});

User.sync({force: true}).then(function() {
  // Table created
  return User.create({
    username: 'saungchi'
  });
});