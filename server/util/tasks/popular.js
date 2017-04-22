const Bento = require('../../../db/models/bentos.js');

const get = (req, res) => {
  Bento.findAll({
    order: 'visit_count DESC',
    limit: 25,
  })
    .then(bentos => res.send(bentos))
    .catch(err => console.log(err));
};

module.exports = { get };
