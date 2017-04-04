const Sequelize = require('sequelize');
const Bento = require('../../../db/models/bentos.js');

const get = (req, res) => {
  Bento.findOne({where: {name: 'Hack Reactor'}})
    .then(function(bento) {
      console.log('Successfully fetched bento from database: ' + bento.name);
      res.send(bento);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Bento.create(req.body)
    .then(function(bento) {
      console.log('Successfully saved bento to database: ' + bento.name);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "name": "Hack Reactor Super Deck",
//   "description": "Learn more about Hack Reactor Cohort 71",
//   "nori_count": "10",
//   "private": "false",
//   "user_id": "1",
//   "category_id": "1"
// }