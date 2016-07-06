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
    uuid: config['UniqueUserID']
  }).resolve(function(err, val) {
    cb(err, val);
    log.info('Fetched stations done.');
  });
});

var a = new StationManager();
a.init().then(function(val) {
  console.log(val.length);
});

module.exports = StationManager;
