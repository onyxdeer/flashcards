const Sequelize = require('sequelize');
const Label = require('../../../db/models/labels.js');

const get = (req, res) => {
  Label.findOne({where: {id: 1}})
    .then(function(label) {
      console.log('Successfully fetched label from database! id:' + label.id);
      res.send(label);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Label.create(req.body)
    .then(function(label) {
      console.log('Successfully saved label to database! id: ' + label.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "user_id": "1",
//   "bento_id": "1",
//   "favorite": "true"
// }