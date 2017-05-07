const elasticsearch = require('elasticsearch');
const aws = require('http-aws-es');
const { ES_ACCESS_KEY, ES_SECRET_KEY } = require('../../../config/config.js');

const client = new elasticsearch.Client({
  host: 'search-obento-rup5jb576m4sj5qnn5dnfotzqq.us-west-1.es.amazonaws.com',
  connectionClass: aws,
  amazonES: {
    region: 'us-west-1',
    accessKey: ES_ACCESS_KEY,
    secretKey: ES_SECRET_KEY,
  },
});

client.ping({
  requestTimeout: 30000,
}, (error) => {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('elasticsearch is up!');
  }
});

module.exports = client;

// Documentation
// https://www.npmjs.com/package/elasticsearch
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
// https://www.npmjs.com/package/http-aws-es
// https://www.reddit.com/r/rails/comments/66q413/why_is_elastic_search_faster_at_querying_compared/
// Cron Job Worker: */1 * * * * /usr/local/bin/node/home/public/flashcards/server/util/search/searchIndex.js
