const Sequelize = require('sequelize');
const Category = require('../../../db/models/categories.js');

const get = (req, res) => {
  Category.findOne({where: {name: 'Fun'}})
    .then(function(category) {
      console.log('Successfully fetched category from database: ' + category.name);
      res.send(category);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Category.create(req.body)
    .then(function(category) {
      console.log('Successfully saved category to database: ' + category.name);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "name": "Fun"
// }