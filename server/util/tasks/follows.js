const Sequelize = require('sequelize');
const Follow = require('../../../db/models/follows.js');

const get = (req, res) => {
  Follow.findOne({where: {user_id: 1}})
    .then(function(follow) {
      console.log('Successfully fetched follow from database! id: ' + follow.id);
      res.send(follow);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Follow.create(req.body)
    .then(function(follow) {
      console.log('Successfully saved follow to database! id: ' + follow.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "user_id": "1",
//   "follow_id": "1"
// }