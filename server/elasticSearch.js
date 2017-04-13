const elasticsearch = require('elasticsearch');
const { ES_ACCESS_KEY, ES_SECRET_KEY } = require('../config/config.js');

// https://www.npmjs.com/package/http-aws-es
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

// client.search({
//   q: 'pants'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   console.trace(error.message);
// });

// client.indices.delete({
//   index: 'test_index',
//   ignore: [404]
// }).then(function (body) {
//   // since we told the client to ignore 404 errors, the
//   // promise is resolved even if the index does not exist
//   console.log('index was deleted or never existed');
// }, function (error) {
//   // oh no!
// });

module.exports = client;