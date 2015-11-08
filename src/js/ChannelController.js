'use strict';

import _ from 'lodash';

class ChannelController {
  constructor($scope, $stateParams, Channels, Sources, Plays) {
    let vm = this;
    let {slug} = $stateParams;

    this.track = {id: 'dQw4w9WgXcQ'};
    this.name = null;
    this.source = null;
    this.channel = null;
    this.sourceId = null;

    Channels.get({slug}, (channel) => {
      console.log('Channel info:', channel);
      let track;

      this.channel = channel;

      if (channel._track) {
        track = this.track = channel._track;
      }

      this.name = channel.name;

      Plays.query(plays => {
        // filter out plays for other channels
        plays = _.where(plays, {_channel: this.channel._id});
      });


      if (track && track._sources) {
        Sources.get({_id: channel._track._sources[0]}, sources => {
          console.log(sources);
          track._sources = sources;
          $scope.$apply();
        });
      }
    });

    // var protocol = (location.protocol === 'http:') ? 'ws:' : 'wss:';
    // var hostname = (location.port === 3000) ? 'localhost:6333' : 'hive.media';
    // var socketPath = `${(protocol)}//${hostname}/channels/test`;
    var socketPath = 'wss://hive.media/channels/test';
    var errorHandler = function() { ws = new WebSocket(socketPath); }
    var ws = new WebSocket(socketPath);
    ws.onerror = errorHandler
    ws.onmessage = (msg) => {
      var data = JSON.parse(msg.data);
      console.log(data);
      if (data && data.params) {
        let {channel, ops} = data.params;
        if (channel === '/channels/' + slug) {
          ops.forEach(op => {
            if (op.op === 'replace' && op.path === '/_track') {
              Sources.get({_id: op.value._sources[0]}, source => {
                this.sourceId = source.id;
                $scope.$apply();
              });
            }
          })
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
  'Sources',
  'Plays'
]

export default ChannelController
