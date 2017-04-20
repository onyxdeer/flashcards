const crypto = require('crypto');
const User = require('./models/users.js');
const Follow = require('./models/follows.js');
const Category = require('./models/categories.js');
const Bento = require('./models/bentos.js');
const Label = require('./models/labels.js');
const Nori = require('./models/noris.js');
const Tag = require('./models/tags.js');
const Image = require('./models/images.js');
const BentoNori = require('./models/bentos_noris.js');
const NoriTag = require('./models/noris_tags.js');

// Hash bento id for bento sharing feature
const idToHash = id => crypto.createHash('md5').update(id.toString()).digest('hex').slice(0, 9);

// Seed database with mock data

// User
User.create({
  username: 'saungchi',
  password: 'saungchipassword',
})
.then(() => User.create({
  username: 'david',
  password: 'davidpassword',
}))

// Follow
.then(() => Follow.create({
  user_id: 1,
  follow_id: 2,
}))

// Category
.then(() => Category.create({
  name: 'Fun',
}))
.then(() => Category.create({
  name: 'Education',
}))

// Bento
.then(() => Bento.create({
  name: 'Hack Reactor',
  description: 'Learn more about Hack Reactor',
  nori_count: 2,
  visit_count: 20,
  user_id: 1,
  category_id: 1,
}))
.then(() => Bento.findOne({
  where: {
    name: 'Hack Reactor',
    description: 'Learn more about Hack Reactor',
    nori_count: 2,
    visit_count: 20,
    user_id: 1,
    category_id: 1,
  },
}).then(response => Bento.update({
  id_hash: idToHash(response.getDataValue('id')),
}, {
  where: {
    id: response.getDataValue('id'),
  },
})))
.then(() => Bento.create({
  name: 'Basketball',
  description: 'Learn more about basketball',
  nori_count: 2,
  visit_count: 30,
  user_id: 2,
  category_id: 2,
}))
.then(() => Bento.findOne({
  where: {
    name: 'Basketball',
    description: 'Learn more about basketball',
    nori_count: 2,
    visit_count: 30,
    user_id: 2,
    category_id: 2,
  },
}).then(response => Bento.update({
  id_hash: idToHash(response.getDataValue('id')),
}, {
  where: {
    id: response.getDataValue('id'),
  },
})))

// Label
.then(() => Label.create({
  user_id: 1,
  bento_id: 2,
  favorite: true,
}))

// Nori
.then(() => Nori.create({ // Hack Reactor React
  text_front: '{"entityMap":{},"blocks":[{"key":"a75u3","text":"Another Test for Example","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"ITALIC"},{"offset":0,"length":12,"style":"UNDERLINE"},{"offset":0,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}}]}',
  text_back: '{"entityMap":{},"blocks":[{"key":"npdf","text":"Done","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a3kfc","text":"with example.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
}))
.then(() => Nori.create({ // Hack Reactor Node
  text_front: '{"entityMap":{},"blocks":[{"key":"iou6","text":"Testing","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
  text_back: '{"entityMap":{},"blocks":[{"key":"81dt4","text":"123","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
}))
.then(() => Nori.create({ // Basketball Curry
  text_front: '{"entityMap":{},"blocks":[{"key":"a75u3","text":"Another Test for Example","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"ITALIC"},{"offset":0,"length":12,"style":"UNDERLINE"},{"offset":0,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}}]}',
  text_back: '{"entityMap":{},"blocks":[{"key":"npdf","text":"Done","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a3kfc","text":"with example.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
}))
.then(() => Nori.create({ // Basketball Green
  text_front: '{"entityMap":{},"blocks":[{"key":"iou6","text":"Testing","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
  text_back: '{"entityMap":{},"blocks":[{"key":"81dt4","text":"123","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
}))

// Tag
.then(() => Tag.create({
  name: '#saungchi',
}))

// Image
.then(() => Image.create({ // Hack Reactor cover
  url: 'https://avatars0.githubusercontent.com/u/2824164?v=3&s=200',
  nori_front: false,
  nori_back: false,
  bento_id: 1,
  nori_id: null,
}))
.then(() => Image.create({ // Basketball cover
  url: 'http://www.jumpstartsports.com/upload/images/Radnor_Basketball/448650-basketball__mario_sports_mix_.png',
  nori_front: false,
  nori_back: false,
  bento_id: 2,
  nori_id: null,
}))
.then(() => Image.create({ // Hack Reactor React front
  url: 'https://cdn2.iconfinder.com/data/icons/luchesa-part-3/128/Programming-512.png',
  nori_front: true,
  nori_back: false,
  bento_id: 1,
  nori_id: 1,
}))
.then(() => Image.create({ // Hack Reactor React back
  url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
  nori_front: false,
  nori_back: true,
  bento_id: 1,
  nori_id: 1,
}))
.then(() => Image.create({ // Hack Reactor Node front
  url: 'https://cdn2.iconfinder.com/data/icons/luchesa-part-3/128/Programming-512.png',
  nori_front: true,
  nori_back: false,
  bento_id: 1,
  nori_id: 2,
}))
.then(() => Image.create({ // Hack Reactor Node back
  url: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png',
  nori_front: false,
  nori_back: true,
  bento_id: 1,
  nori_id: 2,
}))
.then(() => Image.create({ // Basketball Curry front
  url: 'https://s-media-cache-ak0.pinimg.com/736x/23/d1/0f/23d10f4868fe9ac88dd01e65f03bde34.jpg',
  nori_front: true,
  nori_back: false,
  bento_id: 2,
  nori_id: 3,
}))
.then(() => Image.create({ // Basketball Curry back
  url: 'http://clutchpoints.com/wp-content/uploads/2016/04/stephen-curry-is-surprisingly-underpaid-he-signed-a-four-year-44-million-contract-extension-in-2012-and-now-makes-12-million-per-year-he-could-triple-that-when-he-becomes-a-free-agent-in-2017-1-1.jpg',
  nori_front: false,
  nori_back: true,
  bento_id: 2,
  nori_id: 3,
}))
.then(() => Image.create({ // Basketball Green front
  url: 'https://s-media-cache-ak0.pinimg.com/736x/23/d1/0f/23d10f4868fe9ac88dd01e65f03bde34.jpg',
  nori_front: true,
  nori_back: false,
  bento_id: 2,
  nori_id: 4,
}))
.then(() => Image.create({ // Basketball Green back
  url: 'http://images.performgroup.com/di/library/sporting_news/c8/3/draymond-green-030216-getty-ftrjpg_11yxu7bourk4613knzedu46jtp.jpg?t=905845451',
  nori_front: false,
  nori_back: true,
  bento_id: 2,
  nori_id: 4,
}))

// BentoNori
.then(() => BentoNori.create({
  bento_id: 1,
  nori_id: 1,
}))
.then(() => BentoNori.create({
  bento_id: 1,
  nori_id: 2,
}))
.then(() => BentoNori.create({
  bento_id: 2,
  nori_id: 3,
}))
.then(() => BentoNori.create({
  bento_id: 2,
  nori_id: 4,
}))

// NoriTag
.then(() => NoriTag.create({
  nori_id: 1,
  tag_id: 1,
}))

.catch(err => console.log('Error seeding database: ', err));
