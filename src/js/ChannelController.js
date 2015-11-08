'use strict';

class ChannelController {
  constructor($scope, $stateParams, Channels, Sources) {
    let vm = this;
    let {slug} = $stateParams;

    this.track = {id: 'dQw4w9WgXcQ'};
    this.name = null;
    this.source = null;
    this.channel = null;

    Channels.get({slug}, (channel) => {
      console.log('Channel info:', channel);
      let track;

      this.channel = channel;

      if (channel._track) {
        track = this.track = channel._track;
      }
      this.name = channel.name;

      if (track && track._sources) {
        Sources.get({_id: channel._track._sources[0]}, sources => {
          console.log(sources);
          track.sources = sources;
        });
      }
    });

    var protocol = (location.protocol === 'http:') ? 'ws:' : 'wss:';
    var hostname = (location.port === 3000) ? 'localhost:6333' : 'hive.media';
    var socketPath = `${(protocol)}//${hostname}/channels/test`;
    var errorHandler = function() { ws = new WebSocket(socketPath); }
    var ws = new WebSocket(socketPath);
    ws.onerror = errorHandler
    ws.onmessage = (msg) => {
      var data = JSON.parse(msg.data);
      console.log(data);
      if (data && data.params) {
        let {channel, ops} = data.params;
        if (channel === '/channels/test') {
          ops.forEach(op => {
            if (op.op === 'replace' && op.path === '/_track') {
              this.channel._track = op.value;
            }
          })

          $scope.$apply();
        }
      }
    };
  }

  updateTrack(trackId) {
    this.track.id = trackId;
  }
}

ChannelController.$inject = [
  '$scope',
  '$stateParams',
  'Channels',
  'Sources'
]

export default ChannelController
