const Sequelize = require('sequelize');
const Bento_nori = require('../../../db/models/bentos_noris.js');

const get = (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.query:', req.query);
  Bento_nori.findAll({where: {id: 1}})
    .then(function(bento_nori) {
      console.log('Successfully fetched bento_nori from database! id: ' + bento_nori.id);
      res.send(bento_nori);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  Bento_nori.create(req.body)
    .then(function(bento_nori) {
      console.log('Successfully saved bento_nori to database! id: ' + bento_nori.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "bento_id": "1",
//   "nori_id": "1"
// }