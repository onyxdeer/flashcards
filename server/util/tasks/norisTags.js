const NoriTag = require('../../../db/models/norisTags.js');

const get = (req, res) => {
  NoriTag.findOne({ where: { id: 1 } })
    .then(noriTag => res.send(noriTag))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  NoriTag.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
