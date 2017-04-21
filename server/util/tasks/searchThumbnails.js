const $search = require('../search/elasticSearch');

// Elasticsearch for thumbnails
// Not currently being used
const get = (req, res) => {
  $search.search({
    index: 'thumbnails',
    body: {
      query: {
        bool: {
          filter: {
            term: {
              bento_id: `${req.query.idArray}`,
            },
          },
        },
      },
    },
  }, (error, response) => {
    if (error) {
      res.status(422).send({ error: 'Could not fetch results' });
    } else {
      res.status(200).send(response.hits.hits);
    }
  });
};

module.exports = { get };
