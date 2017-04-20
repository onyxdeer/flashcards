const Sequelize = require('sequelize');
const BentoNori = require('../../../db/models/bentos_noris.js');

const get = (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.query:', req.query);
  BentoNori.findAll({where: req.query})
    .then(function(bentoNori) {
      console.log('Successfully fetched bentoNori from database! id: ' + bentoNori.id);
      res.send(bentoNori);
    })
    .catch((err) => console.log(err));
};

const post = (req, res) => {
  BentoNori.create(req.body)
    .then(function(bentoNori) {
      console.log('Successfully saved bentoNori to database! id: ' + bentoNori.id);
      res.send(req.body);
    })
    .catch((err) => console.log(err));    
};

module.exports = {get, post};

// {
//   "bento_id": "1",
//   "nori_id": "1"
// }