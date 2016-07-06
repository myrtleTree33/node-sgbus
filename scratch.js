var Future = require('fibers/future'),
  request = Future.wrap(require('request'));

var Common = function() {
};

var performRequest = function(params) {
  var result = request({
    url: params.url,
    method: params.method,
    headers: {
      AccountKey: params.key,
      UniqueUserID: params.uuid,
      accept: 'application/json'
    },
    qs: params.qs
  }).wait();
  return JSON.parse(result.body);
}

/**
 * Perform a single request
 * @return {[type]} [description]
 */
Common.prototype.retrieve = performRequest.future();


/**
 * Perform multiple requests
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
Common.prototype.multipleRetrieve = function(params) {
  var items = [];
  var count = 0;
  while (true) {
    params.qs = {
      $skip: count
    }
    var response = performRequest(params);
    items = items.concat(response.value);
    if (response.value.length < 50) {
      return items;
    } else {
      count += 50;
    }
  }
}.future();

// multipleRetrieve({
//   url: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
//   method: 'GET',
//   key: config['AccountKey'],
//   uuid: config['UniqueUserID']
// }).resolve(function(err, val) {
//   console.log('done');
// });

module.exports = new Common();
