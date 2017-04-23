const Tag = require('../../../db/models/tags.js');

const get = (req, res) => {
  Tag.findOne({ where: { name: '#saungchi' } })
    .then(tag => res.send(tag))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  Tag.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
