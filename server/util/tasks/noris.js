const Nori = require('../../../db/models/noris.js');

const get = (req, res) => {
  Nori.findAll({ where: req.query })
    .then(nori => res.send(nori))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  Nori.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
