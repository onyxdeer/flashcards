const User = require('../models/users.js');
const Follow = require('../models/follows.js');
const Category = require('../models/categories.js');
const Bento = require('../models/bentos.js');
const Label = require('../models/labels.js');
const Nori = require('../models/noris.js');
const Tag = require('../models/tags.js');
const Image = require('../models/images.js');
const BentoNori = require('../models/bentosNoris.js');
const NoriTag = require('../models/norisTags.js');

// Create database tables
module.exports = () => {
  User.sync();
  Follow.sync();
  Category.sync();
  Bento.sync();
  Label.sync();
  Nori.sync();
  Tag.sync();
  Image.sync();
  BentoNori.sync();
  NoriTag.sync();
};
