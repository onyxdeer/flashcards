const $search = require('../search/elasticSearch');

// Elasticsearch
const get = (req, res) => {
  $search.search({
    index: 'bentos',
    q: `*${req.query.someData}*`,
  }, (error, response) => {
    if (error) {
      res.status(422).send({ error: 'Could not fetch results' });
    } else {
      res.status(200).send(response.hits.hits);
    }
  });
};

module.exports = { get };
