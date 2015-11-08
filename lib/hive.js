var config = require('../config');

var Maki = require('maki');
var hive = new Maki(config);

var Passport = require('maki-passport-local');
var passport = new Passport({
  resource: 'Person'
});

var Auth = require('maki-auth-simple');
var auth = new Auth({
  resource: 'Person',
  capabilities: {
    'queue': ['*']
  }
});

hive.use(passport);
hive.use(auth);

var Person   = hive.define('Person',   require('../resources/person'));
var Category = hive.define('Category', require('../resources/category'));
var Channel  = hive.define('Channel',  require('../resources/channel'));
var Search   = hive.define('Search',   require('../resources/search'));
var Source   = hive.define('Source',   require('../resources/source'));
var Track    = hive.define('Track',    require('../resources/track'));
var Play     = hive.define('Play',     require('../resources/play'));

Search.post('create', function(next, cb) {
  var search = this;
  var youtube = require('../lib/youtube');
  
  youtube.search.list({
    part: 'snippet',
    q: search.query
  }, function(err, results) {
    if (err) console.log('error retrieving youtube:', err);
    if (results && results.items && results.items.length) {
      results.items.forEach(function(item) {
        var video = {
          type: 'youtube',
          id: item.id.videoId,
          title: item.snippet.title
        }

        Source.create(video, function(err, source) {
          if (err) console.log('error creating source:', err);
        });
      });
    }
  });

  next();
});

// update the room if no track is playing.  start the music!
Play.post('create', function(next, cb) {
  var play = this;
  if (play.state === 'queued') {
    Channel.Model.findOne({ _id: play._channel }).exec(function(err, channel) {
      return channel.advanceToPlay(play);
    });
  }
  next();
});

Source.post('create', function(next, cb) {
  var source = this;
  var youtube = require('../lib/youtube');
  var moment = require('moment');
  
  console.log('source created, ', source);
  // TODO: crawl it.  use the worker!
  // TODO: create the worker.
  // TODO: upsert
  Track.create({
    title: source.title || 'Unknown',
    duration: source.duration || 15,
    sources: [ source._id ]
  }, function(err, track) {
    console.log('track created,', err || track);
    
    youtube.videos.list({
      part: 'contentDetails',
      id: source.id
    }, function(err, results) {
      if (err) console.log(err);
      if (results && results.items && results.items.length) {
        results.items.forEach(function(item) {
          console.log(item);
          var duration = moment.duration(item.contentDetails.duration).as('seconds');
          
          console.log('duration:', duration);
          
          Source.patch({
            _id: source._id
          }, [
            { op: 'add', path: '/duration', value: duration },
            { op: 'replace', path: '/duration', value: duration }
          ], function(err, sources) {
            console.log('duration edited:', err, sources);
          });
          
          // TODO: make smarter by not always running against the tracks
          // really this is only for NKO
          Track.patch({
            sources: source._id
          }, [
            { op: 'add', path: '/duration', value: duration },
            { op: 'replace', path: '/duration', value: duration }
          ], function(err, tracks) {
            console.log('duration edited:', err, tracks);
          });
          
        });
      }
    });
    
    next();
  });
});

module.exports = hive;
