const Sequelize = require('sequelize');
const Tag = require('../../../db/models/tags.js');

const get = (req, res) => {
  Tag.findOne({where: {name: '#saungchi'}})
    .then(function(tag) {
      console.log('Successfully fetched tag from database: ' + tag.name);
      res.send(tag);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Tag.create(req.body)
    .then(function(tag) {
      console.log('Successfully saved tag to database: ' + tag.name);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "name": "#saungchi"
// }