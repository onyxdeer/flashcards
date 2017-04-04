const Sequelize = require('sequelize');
const Nori = require('../../../db/models/noris.js');

const get = (req, res) => {
  Nori.findOne({where: {name: 'Eric'}})
    .then(function(nori) {
      console.log('Successfully fetched nori from database: ' + nori.name);
      res.send(nori);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Nori.create(req.body)
    .then(function(nori) {
      console.log('Successfully saved nori to database: ' + nori.name);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "name": "Eric",
//   "description": "Question about Eric",
//   "text": "Who is Eric's favorite basketball player?" 
// }