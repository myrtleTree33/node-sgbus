var Future = require('fibers/future'),
  request = Future.wrap(require('request'));

var config = require('./config.json');

var retrieve = function(params) {
  var result = request({
    url: params.url,
    method: params.method,
    headers: {
      AccountKey: params.key,
      UniqueUserID: params.uuid,
      accept: 'application/json'
    }
  }).wait();
  return result.body;
}.future();

retrieve({
  url: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
  method: 'GET',
  key: config['AccountKey'],
  uuid: config['UniqueUserID']
}).resolve(function(err, val) {
  console.log(val);
});
