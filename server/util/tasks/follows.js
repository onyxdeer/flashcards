const Follow = require('../../../db/models/follows.js');

const get = (req, res) => {
  Follow.findOne({ where: { user_id: 1 } })
    .then(follow => res.send(follow))
    .catch(err => console.log(err));
};

const post = (req, res) => {
  Follow.create(req.body)
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
};

module.exports = { get, post };
