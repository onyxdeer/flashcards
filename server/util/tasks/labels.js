const Label = require('../../../db/models/labels.js');

const get = (req, res) => {
  Label.findAll({
    where: req.query,
    attributes: ['bento_id'],
  })
    .then(label => res.send(label))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  Label.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
