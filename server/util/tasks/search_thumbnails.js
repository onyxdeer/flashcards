const Sequelize = require('sequelize');

const Image = require('../../../db/models/images.js');
const $search = require('../../elasticSearch');

const get = (req, res) => {
  console.log('THUMBNAIL: Req.query: ', req.query.idArray);    
  $search.search({
    index: 'thumbnails',
    body: {
      query: {
        bool: {
          filter: {
            term: {
              bento_id: `${req.query.idArray}`
            }
          }
        }
      }
    }
    // q: {bento_id: req.query.idArray},
    // q: `*${req.query.idArray}*`
  }, function (error, response) {
    if (error) {
      return res.status(422).send({error: 'Could not fetch results'});
    }
    console.log('THUMBNAILS RESPONSE HITS HITS: ', response.hits.hits)
    res.status(200).send(response.hits.hits);
  });
}

module.exports = {get};