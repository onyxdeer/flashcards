const Sequelize = require('sequelize');
const NoriTag = require('../../../db/models/noris_tags.js');

const get = (req, res) => {
  NoriTag.findOne({where: {id: 1}})
    .then(function(noriTag) {
      console.log('Successfully fetched noriTag from database! id: ' + noriTag.id);
      res.send(noriTag);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  NoriTag.create(req.body)
    .then(function(noriTag) {
      console.log('Successfully saved noriTag to database!: id ' + noriTag.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "nori_id": "1",
//   "tag_id": "1"
// }