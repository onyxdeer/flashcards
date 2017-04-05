const Sequelize = require('sequelize');
const Nori_tag = require('../../../db/models/noris_tags.js');

const get = (req, res) => {
  Nori_tag.findOne({where: {id: 1}})
    .then(function(nori_tag) {
      console.log('Successfully fetched nori_tag from database! id: ' + nori_tag.id);
      res.send(nori_tag);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Nori_tag.create(req.body)
    .then(function(nori_tag) {
      console.log('Successfully saved nori_tag to database!: id ' + nori_tag.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "nori_id": "1",
//   "tag_id": "1"
// }