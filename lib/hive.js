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
  
  Channel.patch({
    _id: play._channel,
    _play: null // only update if no track is playing!
  }, [
    { op: 'add', path: '/_play', value: play._id },
    { op: 'add', path: '/_track', value: play._track },
    { op: 'replace', path: '/_play', value: play._id },
    { op: 'replace', path: '/_track', value: play._track }
  ], function(err) {
    
  });
  
  next();
});

// if room was updated, determine if we need to perform any action
Channel.on('update', function(set) {
  // TODO: make more convenient in Maki
  var channel = set[0];
  if (!channel) return;
  if (!channel._track) return;
  
  var emptyMachine = (!channel._play && channel._track);
  var demandTrack = (channel._play && channel._track && channel._play.toString() !== channel._track.toString());

  console.log('emptyMachine', emptyMachine);
  console.log('demandTrack', demandTrack);
  
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

  /* Play.patch({
    _play: channel._play,
    _channel: channel._id,
    state: 'queued',
  }, [
    { op: 'replace', path: '/state', value: 'playing' }
  ], function(err, doc) {
    var startedPlaying = (!err && doc.length);
    if (startedPlaying) {
      setTimeout(function nextTrack() {
        console.log('rotating to next track');
        Play.patch({
          _play: channel._play,
          _channel: channel._id,
          state: 'playing'
        }, [
          { op: 'replace', path: '/state', value: 'played' }
        ], function(err, doc) {
          console.log('played past tense', err || doc);
        });
      }, 1000); // TODO: <- replace with real duration
    }
  }); */
});

/*
// prevent patch from applying if the play was updated somewhere else
Channel.pre('patch', function(next, done) {
  var channel = this;
  
  // TODO: port into Maki a way to pre-populate in pre-patch
  console.log('channel:', channel);
  
  Play.patch({
    _channel: channel._id,
    state: 'queued'
  }, [
    { op: 'replace', path: '/state', value: 'playing' }
  ], function(err, doc) {
    console.log('plays patched', err || doc);
    var patchCompleted = (!err && doc.length);
    console.log('patchCompleted', patchCompleted);
    
    if (!patchCompleted) {
      return done('State transition broken.');
    }
    next();
  });
}); */

Track.on('update', function(instance) {
  console.log('patch,', instance);
});

module.exports = hive;
