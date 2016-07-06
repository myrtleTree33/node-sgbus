var config = require('./config.json');

var request = require('request');

function StationManager() {

}

StationManager.prototype.init = function() {
  request({
    url: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
    method: 'GET',
    headers: {
      AccountKey: config['AccountKey'],
      UniqueUserID: config['UniqueUserID'],
      accept: 'application/json'
    }
  }, function(err, res, body) {
    console.log(res.statusCode);
    if (!err && res.statusCode == 200) {
      console.log(body);
    }
  });
}

var a = new StationManager();
a.init();

module.exports = StationManager;
