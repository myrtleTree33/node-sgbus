var config = require('./config.json');

var request = require('request'),
  Promise = require('bluebird'),
  log = require('bunyan').createLogger({
    name: 'StationManager'
  }),
  _ = require('lodash'),
  Common = require('./common');

function StationManager() {}

StationManager.prototype.init = Promise.promisify(function(cb) {
  log.info('Fetching stations..');
  Common.multipleRetrieve({
    url: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
    method: 'GET',
    key: config['AccountKey'],
    uuid: config['UniqueUserID'],
    dataKey: 'value'
  }).resolve(function(err, val) {
    cb(err, val);
    log.info('Fetched stations done.');
  });
});

StationManager.prototype.getBuses = Promise.promisify(function(params, cb) {
  var busStopId = params.qs.BusStopID;
  log.info('Fetching buses at station..');
  Common.multipleRetrieve({
    url: 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival',
    method: 'GET',
    key: config['AccountKey'],
    uuid: config['UniqueUserID'],
    qs: {
      BusStopID: busStopId
    },
    dataKey: 'Services'
  }).resolve(function(err, val) {
    cb(err, {
      busStopId: busStopId,
      buses: val
    });
    log.info('Fetched stations done.');
  });
});

// var a = new StationManager();
// a.init().then(function(stations) {
//   console.log(stations.length);
// });

var b = new StationManager();
b.getBuses({
  qs: {
    BusStopID: '85099'
  }
}).then(function(data) {
  console.log(data);
});


module.exports = StationManager;
