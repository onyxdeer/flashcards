const Sequelize = require('sequelize');

const Bento = require('../../../db/models/bentos.js');
const $search = require('../../elasticSearch');

const get = (req, res) => {
  console.log('Req.query.someData: ', req.query.someData);
  $search.search({
    index: 'bentos',
    q: `*${req.query.someData}*`
  }, function (error, response) {
    if (error) {
      return res.status(422).send({error: 'Could not fetch results'});
    }
    console.log('Response hits hits:', response.hits.hits);
    res.status(200).send(response.hits.hits);
  });
}

module.exports = {get};