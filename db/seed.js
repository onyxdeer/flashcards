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

// Seed database with test data
User.create({
  username: 'saungchi',
  password: 'saungchipassword',
})
.then(function() {
  Follow.create({
    user_id: 1,
    follow_id: 1
  });
})
.then(function() {
  Category.create({
    name: 'Fun',
  });
})
.then(function() {
  Bento.create({
    name: 'Hack Reactor',
    description: 'Learn more about Hack Reactor Cohort 71',
    nori_count: 10,
    visit_count: 20,
    user_id: 1,
    category_id: 1
  });
})
.then(function() {
  Label.create({
    user_id: 1,
    bento_id: 1,
    favorite: true
  });
})
.then(function() {
  Nori.create({
    text_front: 'Who is Eric\'s favorite basketball player?',
    text_back: 'Stephen Curry'
  });
})
.then(function() {
  Tag.create({
    name: '#saungchi'
  });
})
.then(function() {
  Image.create({
    url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
    nori_front: true,
    nori_back: false,
    bento_id: 1,
    nori_id: 1
  });
})
.then(function() {
  Bento_nori.create({
    bento_id: 1,
    nori_id: 1
  });
})
.then(function() {
  Nori_tag.create({
    nori_id: 1,
    tag_id: 1
  });
})
.catch((err) => console.log('Error seeding database: ', err));
