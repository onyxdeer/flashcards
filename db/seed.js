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
const crypto = require('crypto');

// Hash bento id for bento sharing feature
const idToHash = id => crypto.createHash('md5').update(id.toString()).digest('hex').slice(0, 9);

// Seed database with mock data
User.create({
  username: 'saungchi',
  password: 'saungchipassword',
})
.then(() => Follow.create({
  user_id: 1,
  follow_id: 1,
}))
.then(() => Category.create({
  name: 'Fun',
}))
.then(() => Bento.create({
  name: 'Hack Reactor',
  description: 'Learn more about Hack Reactor Cohort 71',
  nori_count: 10,
  visit_count: 20,
  user_id: 1,
  category_id: 1,
}))
.then(() => Bento.findOne({
  where: {
    name: 'Hack Reactor',
    user_id: 1,
  },
}).then(response => Bento.update({
  id_hash: idToHash(response.getDataValue('id')),
}, {
  where: {
    id: response.getDataValue('id'),
  },
})))
.then(() => Label.create({
  user_id: 1,
  bento_id: 1,
  favorite: true,
}))
.then(() => Nori.create({
  text_front: '{"entityMap":{},"blocks":[{"key":"a75u3","text":"Another Test for Example","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"ITALIC"},{"offset":0,"length":12,"style":"UNDERLINE"},{"offset":0,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}}]}',
  text_back: '{"entityMap":{},"blocks":[{"key":"npdf","text":"Done","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a3kfc","text":"with example.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
}))
.then(() => Nori.create({
  text_front: '{"entityMap":{},"blocks":[{"key":"iou6","text":"Testing","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
  text_back: '{"entityMap":{},"blocks":[{"key":"81dt4","text":"123","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
}))
.then(() => Tag.create({
  name: '#saungchi',
}))
.then(() => Image.create({
  url: 'http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg',
  nori_front: false,
  nori_back: false,
  bento_id: 1,
  nori_id: null,
}))
.then(() => Image.create({
  url: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
  nori_front: true,
  nori_back: false,
  bento_id: 1,
  nori_id: 1,
}))
.then(() => Image.create({
  url: 'https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_960_720.jpg',
  nori_front: false,
  nori_back: true,
  bento_id: 1,
  nori_id: 1,
}))
.then(() => Image.create({
  url: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
  nori_front: true,
  nori_back: false,
  bento_id: 1,
  nori_id: 2,
}))
.then(() => Image.create({
  url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  nori_front: false,
  nori_back: true,
  bento_id: 1,
  nori_id: 2,
}))
.then(() => BentoNori.create({
  bento_id: 1,
  nori_id: 1,
}))
.then(() => BentoNori.create({
  bento_id: 1,
  nori_id: 2,
}))
.then(() => NoriTag.create({
  nori_id: 1,
  tag_id: 1,
}))
.catch(err => console.log('Error seeding database: ', err));
