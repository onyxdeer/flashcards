const elasticsearch = require('elasticsearch');
const { ES_ACCESS_KEY, ES_SECRET_KEY } = require('../config/config.js');

const client = new elasticsearch.Client({
  host:'search-obento-2pbfskuhe4thki26tye6rfqwli.us-east-1.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'us-east-1',
    accessKey: ES_ACCESS_KEY,
    secretKey: ES_SECRET_KEY
  }
}) 

client.ping({
  requestTimeout: 30000,
}, function (error) {
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
