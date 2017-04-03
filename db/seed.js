const Sequelize = require('sequelize');
const db = require('./index.js');
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

User.sync({logging: console.log})
  .then(function() {
    User.create({
    username: 'saungchi',
    password: 'saungchipassword',
    });
  })
  .catch(function(err) {
    console.log(err);
  });

Follow.sync({logging: console.log})
  .then(function() {
    Follow.create({
      user_id: 1,
      follow_id: 1
    });
  })
  .catch(function(err) {
    console.log(err);
  });

Category.sync({logging: console.log})
  .then(function() {
    Category.create({
      name: 'Fun',
    });
  })
  .catch(function(err) {
    console.log(err);
  });

Bento.sync({logging: console.log})
  .then(function() {
    Bento.create({
      name: 'Hack Reactor',
      description: 'Learn more about Hack Reactor Cohort 71',
      nori_count: 10,
      private: false,
      user_id: 1,
      category_id: 1
    });
  })
  .catch(function(err) {
    console.log(err);
  });

// Label.sync({logging: console.log})
//   .then(function() {
//     Label.create({
//       user_id: 1,
//       bento_id: 1,
//       favorite: true
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// Nori.sync({logging: console.log})
//   .then(function() {
//     Nori.create({
//       name: 'Eric',
//       description: 'Question about Eric',
//       text: 'Who is Eric\'s favorite basketball player?' 
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// Tag.sync({logging: console.log})
//   .then(function() {
//     Tag.create({
//       name: '#saungchi'
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// Image.sync({logging: console.log})
//   .then(function() {
//     Image.create({
//       url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
//       bento_id: 1,
//       nori_id: 1
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// Bento_nori.sync({logging: console.log})
//   .then(function() {
//     Bento_nori.create({
//       bento_id: 1,
//       nori_id: 1
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// Nori_tag.sync({logging: console.log})
//   .then(function() {
//     Nori_tag.create({
//       nori_id: 1,
//       tag_id: 1
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// Sequelize will automatically add the columns id, createdAt and updatedAt. createdAt and updatedAt are controlled by sequelize - when you create a model through sequelize createdAt will be set, and whenever you call updateAttributes / save on a model, updatedAt will be set.