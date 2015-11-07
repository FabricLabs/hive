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
    sources: [ source._id ]
  }, function(err, track) {
    console.log('track created,', err || track);
    next();
  });
});

Play.post('create', function(next, cb) {
  var play = this;
  console.log('play created, ', play);
  Channel.patch({ _id: play._channel }, [
    { op: 'add', path: '/_track', value: play._track },
    { op: 'replace', path: '/_track', value: play._track }
  ], function(err, doc) {
    console.log('channel.path came back:', err, doc);
    next();
  });
});

Track.on('update', function(instance) {
  console.log('patch,', instance);
});

module.exports = hive;
