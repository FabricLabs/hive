var _ = require('lodash');
var async = require('async');
var Remote = require('maki-remote');

var categoriesOnProduction = new Remote('https://hive.media/categories');
var categoriesOnLocal = new Remote('http://localhost:6333/categories');

var channelsOnProduction = new Remote('https://hive.media/channels');
var channelsOnLocal = new Remote('http://localhost:6333/channels');

categoriesOnProduction.query({}, function(cats) {
  async.each(cats, function(cat, done) {
    categoriesOnLocal.create({
      name: cat.name
    }, done);
  }, function(err, results) {
    
    channelsOnProduction.query({}, function(channels) {
      channels.forEach(function(channel) {
        channelsOnLocal.create({
          name: channel.name,
          _category: _.sample(cats.map(function(x) {
            return x._id;
          }))
        }, function(err, channel) {
          console.log(err || channel);
        });
      });
    });
    
  });
});
