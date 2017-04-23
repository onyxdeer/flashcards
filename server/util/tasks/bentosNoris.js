const BentoNori = require('../../../db/models/bentosNoris.js');

const get = (req, res) => {
  BentoNori.findAll({ where: req.query })
    .then(bentoNori => res.send(bentoNori))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  BentoNori.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
