const Category = require('../../../db/models/categories.js');

const get = (req, res) => {
  Category.findOne({ where: { name: 'Fun' } })
    .then(category => res.send(category))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  Category.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
