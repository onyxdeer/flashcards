const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

const $search = require('../services/elasticSearch')

exports.search = function(req, res) {
  const { query }  = req.query
  $search.search({
    index: 'recipes',
    q: `*${query}*`
  }, function (error, response) {
    if (error) return res.status(422).send({ error: 'Could not fetch results' })
    res.status(200).send(response.hits.hits)
  });
}