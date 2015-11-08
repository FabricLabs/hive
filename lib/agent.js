var _ = require('lodash');
var async = require('async');
var Remote = require('maki-remote');

/**/
var base = 'http://localhost:6333';
/*/
var base = 'https://hive.media';
/**/

// TODO: bind an entire remote instance, auto-wire via OPTIONS
var Channel = new Remote(base + '/channels');
var Track = new Remote(base + '/tracks');
var Play = new Remote(base + '/plays');

function Agent(name) {
  this.channelName = name;
}

Agent.prototype.playTrack = function() {
  var self = this;
  self.pickTrack(function(err, track) {
    console.log('track picked:', err , track);
    self.playTrackNow(track, function(err, set) {
      console.log('trackUpdatedChannel:', err , set);
      console.log('scheduling rotation in', track.duration + 's');
      setTimeout(function() {
        console.log('rotating!');
        self.playTrack();
      }, track.duration * 1000);
    });
  });
}

Agent.prototype.pickTrack = function(cb) {
  var self = this;
  Track.query({}, function(tracks) {
    console.log('track options:', tracks.length);
    var selection = _.sample(tracks);
    cb(null, selection);
  });
}

Agent.prototype.playTrackNow = function(track, cb) {
  var self = this;
  Play.create({
    _channel: self.channel._id,
    _track: track._id
  }, function(err, play) {
    console.log('play created:', err , play);
    cb(err, play);
  });
}

Agent.prototype.start = function() {
  var self = this;

  Channel.get(self.channelName, function(err, channel) {
    console.log('channel:', err || channel);
    self.channel = channel;
    self.playTrack();
  });

}

module.exports = Agent;
