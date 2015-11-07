var _ = require('lodash');
var async = require('async');
var Remote = require('maki-remote');

// TODO: bind an entire remote instance, auto-wire via OPTIONS
var Channel = new Remote('http://localhost:6333/channels');
var Track = new Remote('http://localhost:6333/tracks');
var Play = new Remote('http://localhost:6333/plays');

function Agent() {
  this.channelName = 'test';
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
    console.log('errrrrr', tracks);
    var selection = _.sample(tracks);
    console.log(selection);
    cb(null, selection);
  });
}


Agent.prototype.playTrackNow = function(track, cb) {
  var self = this;
  Channel.update(self.channelName, {
    _track: track._id
  }, function(err, set) {
    cb(err, set);
  });
}

Agent.prototype.start = function() {
  var self = this;

  Channel.get(self.channelName, function(err, channel) {
    console.log('channel:', err || channel);
    self.playTrack();
  });

}

module.exports = Agent;
