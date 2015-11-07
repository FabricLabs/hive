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
var Source   = hive.define('Source',   require('../resources/source'));
var Track    = hive.define('Track',    require('../resources/track'));
var Play     = hive.define('Play',     require('../resources/play'));

Source.post('create', function(next, cb) {
  var source = this;
  console.log('source created, ', source);
  // TODO: crawl it.  use the worker!
  // TODO: create the worker.
  // TODO: upsert
  Track.create({
    title: 'Never Gonna Give You Up',
    duration: 15000,
    sources: [ source._id ]
  }, function(err, track) {
    console.log('track created,', err || track);
    next();
  });
});

Play.on('update', function(set) {
  console.log('play updated, obv', set);
  var play = set[0];  
});

// update the room if no track is playing.  start the music!
Play.post('create', function(next, cb) {
  var play = this;
  console.log('play created, ', play);
  next();
});

// if room was updated, determine if we need to perform any action
Channel.on('update', function(set) {
  // TODO: make more convenient in Maki
  var channel = set[0];
  if (!channel) return;
  if (!channel._track) return;
  if (channel._play && channel._play.toString() === channel._track.toString()) {
    return;
  }
  
  var emptyMachine = (!channel._play && channel._track);
  var demandTrack = (channel._play && channel._track && channel._play.toString() !== channel._track.toString());

  console.log('channel:update', channel);
  
  if (emptyMachine || demandTrack) {
    console.log('channel needs new play...', emptyMachine , demandTrack);

    Play.create({
      created: Date.now(),
      _channel: channel._id,
      _track: channel._track || null,
      state: 'playing'
    }, function(err, play) {
      console.log('play creation:', err, play);
      
    });
  }
});

Track.on('update', function(instance) {
  console.log('patch,', instance);
});

module.exports = hive;
