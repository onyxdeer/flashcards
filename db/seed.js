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
const crypto = require('crypto');

const idToHash = (id) => {
  return crypto.createHash('md5').update(id.toString()).digest("hex").slice(0,9);
}

// Seed database with test data
User.create({
  username: 'saungchi',
  password: 'saungchipassword',
})
.then(function() {
  return Follow.create({
    user_id: 1,
    follow_id: 1
  });
})
.then(function() {
  return Category.create({
    name: 'Fun',
  });
})
.then(function() {
  return Bento.create({
    name: 'Hack Reactor',
    description: 'Learn more about Hack Reactor Cohort 71',
    nori_count: 10,
    visit_count: 20,
    user_id: 1,
    category_id: 1
  })
})
.then(function() {
  return Bento.findOne({
    where: {
      name: 'Hack Reactor',
      user_id: 1
    }
  }).then(function(response) {
    return Bento.update({
      id_hash: idToHash(response.getDataValue('id'))
    }, {
      where: {
        id: response.getDataValue('id')
      }
    });
  });
})
.then(function() {
  return Label.create({
    user_id: 1,
    bento_id: 1,
    favorite: true
  });
})
.then(function() {
  return Nori.create({
    text_front: '{"entityMap":{},"blocks":[{"key":"a75u3","text":"Another Test for Example","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"ITALIC"},{"offset":0,"length":12,"style":"UNDERLINE"},{"offset":0,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}}]}',
    text_back: '{"entityMap":{},"blocks":[{"key":"npdf","text":"Done","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a3kfc","text":"with example.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
  });
})
.then(function() {
  return Nori.create({
    text_front: '{"entityMap":{},"blocks":[{"key":"iou6","text":"Testing","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
    text_back: '{"entityMap":{},"blocks":[{"key":"81dt4","text":"123","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
  });
})
.then(function() {
  return Tag.create({
    name: '#saungchi'
  });
})
.then(function() {
  return Image.create({
    url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
    nori_front: true,
    nori_back: false,
    bento_id: 1,
    nori_id: 1
  });
})
.then(function() {
  return Image.create({
    url: 'https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_960_720.jpg',
    nori_front: false,
    nori_back: true,
    bento_id: 1,
    nori_id: 1
  });
})
.then(function() {
  return Image.create({
    url: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
    nori_front: true,
    nori_back: false,
    bento_id: 1,
    nori_id: 2
  });
})
.then(function() {
  return Image.create({
    url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    nori_front: false,
    nori_back: true,
    bento_id: 1,
    nori_id: 2
  });
})
.then(function() {
  return Bento_nori.create({
    bento_id: 1,
    nori_id: 1
  });
})
.then(function() {
  return Bento_nori.create({
    bento_id: 1,
    nori_id: 2
  });
})
.then(function() {
  return Nori_tag.create({
    nori_id: 1,
    tag_id: 1
  });
})
.catch((err) => console.log('Error seeding database: ', err));
