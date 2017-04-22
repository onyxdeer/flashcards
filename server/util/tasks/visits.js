const Sequelize = require('sequelize');
const Bento = require('../../../db/models/bentos.js');

const post = (req, res) => {
  console.log('req.body for /visits/post:', req.body);
  Bento.update({
    visit_count: req.body.visit_count,
  }, {
    where: { id: req.body.bento_id }
  })
  .then(function(visit_count) {
    res.send(visit_count);
  })
  .catch((err) => console.log(err));
};

module.exports = { post };