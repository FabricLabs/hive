var _ = require('lodash');
var async = require('async');
var Remote = require('maki-remote');

var categoriesOnProduction = new Remote('https://hive.media/categories');
var categoriesOnLocal = new Remote('http://localhost:6333/categories');

var channelsOnProduction = new Remote('https://hive.media/channels');
var channelsOnLocal = new Remote('http://localhost:6333/channels');

var sourcesOnProduction = new Remote('https://hive.media/sources');
var sourcesOnLocal = new Remote('http://localhost:6333/sources');

var tracksOnProduction = new Remote('https://hive.media/tracks');
var tracksOnLocal = new Remote('http://localhost:6333/tracks');

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
    
    sourcesOnProduction.query({}, function(sources) {
      sources.forEach(function(source) {
        sourcesOnLocal.create({
          name: source.name,
          _category: _.sample(cats.map(function(x) {
            return x._id;
          }))
        }, function(err, source) {
          console.log(err || source);
        });
      });
    });
    
    tracksOnProduction.query({}, function(tracks) {
      tracks.forEach(function(track) {
        tracksOnLocal.create({
          name: track.name,
          _category: _.sample(cats.map(function(x) {
            return x._id;
          }))
        }, function(err, track) {
          console.log(err || track);
        });
      });
    });
    
  });
});
