const Sequelize = require('sequelize');
const User = require('../../../db/models/users.js');

const get = (req, res) => {
  User.findOne({where: {username: 'saungchi'}})
    .then(function(user) {
      console.log('Successfully fetched user from database: ' + user.username);
      res.send(user);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  User.create(req.body)
    .then(function(user) {
      console.log('Successfully saved user to database: ' + user.username);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};