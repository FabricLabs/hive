var ObjectId = require('mongoose').SchemaTypes.ObjectId;

var ChannelResource = {
  attributes: {
    name: { type: String , max: 200 , required: true , slug: true },
    description: { type: String },
    _category: { type: ObjectId , ref: 'Category', populate: ['get', 'query'] },
    created: { type: Date , required: true , default: Date.now },
    _creator: { type: ObjectId , ref: 'Person' },
    _owner: { type: ObjectId , ref: 'Person' },
    _track: { type: ObjectId , ref: 'Track' , populate: ['get', 'query'] },
    _play: { type: ObjectId , ref: 'Play', populate: ['get', 'query'] }
  },
  methods: {
    advanceToPlay: function(play) {
      var now = Date.now();
      var self = this;

      self.Resource.patch({
        _id: play._channel
      }, [
        { op: 'add', path: '/_play', value: play._id.toString() },
        { op: 'add', path: '/_track', value: play._track.toString() },
        { op: 'replace', path: '/_play', value: play._id.toString() },
        { op: 'replace', path: '/_track', value: play._track.toString() },
      ], function(err, channels) {
        console.log('channels patched', err, channels);
        self.Resource.Model.findOne({ _id: play._channel }).exec(function(err, channel) {
          console.log('about to call cleanAndRotate on ', err, channel.slug);
          channel.cleanAndRotate();
        });
        
        var startedPlaying = (!err && channels.length);
        if (startedPlaying) {
          self.Resources.Play.patch({ _id: play._id }, [
            { op: 'replace', path: '/state', value: 'playing' },
            { op: 'add', path: '/started', value: now },
            { op: 'replace', path: '/started', value: now },
          ], function(err, plays) {
            console.log('startedPlaying', err, plays);
          });
        }
      });
    },
    cleanAndRotate: function() {
      var self = this;
      var channel = this;
      var now = Date.now();
      
      channel.populate('_play _track', function(err, channel) {
        console.log('channel.cleanAndRotate()', channel.slug);
        if (channel._play && channel._track && channel._play.state === 'playing') {
          var rotationTime = channel._play.started.getTime() + (channel._track.duration * 1000);
          var trackExpired = (now > rotationTime);
          console.log('track is playing, and expired', trackExpired);
        } else {
          var emptyMachine = true;
          console.log('emptyMachine');
        }
        
        if (emptyMachine || trackExpired) {
          self.Resources.Play.query({
            _channel: channel._id,
            state: 'queued'
          }, function(err, plays) {

            console.log('plays looked up...', err, plays);
            
            if (plays.length) {
              self.advanceToPlay(plays[0]);
            }
          });
        }
      });
    }
  }
}

module.exports = ChannelResource;
