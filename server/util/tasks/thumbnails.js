const Image = require('../../../db/models/images.js');

const get = (req, res) => {
  Image.findAll({ where: req.query })
    .then(thumbnails => res.send(thumbnails))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  Image.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
