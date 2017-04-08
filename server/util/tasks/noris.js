const Sequelize = require('sequelize');
const Nori = require('../../../db/models/noris.js');

const get = (req, res) => {
  console.log('req.query in noris/get:', req.query);
  Nori.findAll({where: req.query})
    .then(function(nori) {
      console.log('Successfully fetched nori from database! id: ' + nori.id);
      res.send(nori);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  console.log('req.body:', req.body);
  Nori.create(req.body)
    .then(function(nori) {
      console.log('Successfully saved nori to database! id: ' + nori.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "text_front": "Who is Eric's favorite basketball player?",
//   "text_back": "Stephen Curry"
// }