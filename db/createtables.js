const Sequelize = require('sequelize');
const db = require('./connect.js');
const User = require('./models/users.js');
const Follow = require('./models/follows.js');
const Category = require('./models/categories.js');
const Bento = require('./models/bentos.js');
const Label = require('./models/labels.js');
const Nori = require('./models/noris.js');
const Tag = require('./models/tags.js');
const Image = require('./models/images.js');
const Bento_nori = require('./models/bentos_noris.js');
const Nori_tag = require('./models/noris_tags.js');

// Create database tables
module.exports = function() {
  // Bento.belongsTo(Category);
  // Category.hasMany(Bento);

  return User.sync({logging: console.log})
    .then(() => Follow.sync({logging:console.log}))
    .then(() => Category.sync({logging:console.log}))
    .then(() => Bento.sync({logging:console.log}))
    .then(() => Label.sync({logging:console.log}))
    .then(() => Nori.sync({logging:console.log}))
    .then(() => Tag.sync({logging:console.log}))
    .then(() => Image.sync({logging:console.log}))
    .then(() => Bento_nori.sync({logging:console.log}))
    .then(() => Nori_tag.sync({logging:console.log}))
    .catch((err) => console.log('Error creating database tables: ', err));
};

// Sequelize will automatically add the columns id, createdAt and updatedAt. createdAt and updatedAt are controlled by sequelize - when you create a model through sequelize createdAt will be set, and whenever you call updateAttributes / save on a model, updatedAt will be set.