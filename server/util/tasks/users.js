const User = require('../../../db/models/users.js');

const get = (req, res) => {
  User.findOne({ where: { username: 'saungchi' } })
    .then((user) => {
      res.send(user);
    })
    .catch(err => console.log(err));
};

const post = (req, res) => {
  User.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
