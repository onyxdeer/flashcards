const Sequelize = require('sequelize');
const Bento = require('../../../db/models/bentos.js');
const Nori = require('../../../db/models/noris.js');
const Bento_nori = require('../../../db/models/bentos_noris.js');


const get = (req, res) => {
  console.log('req.query for /bentos/get');
  Bento.findAll({
    order: 'visit_count DESC',
    limit: 10
  })
    .then(function(bentos) {
      // console.log('bento:', bento);
      res.send(bentos);
    })
    .catch((err) => console.log(err));
};

module.exports = {get};
