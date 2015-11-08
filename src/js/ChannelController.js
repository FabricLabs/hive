'use strict';

class ChannelController {
  constructor($stateParams, Channels, Sources) {
    let {slug} = $stateParams;

    this.track = null;
    this.name = null;
    this.source = null;

    Channels.get({slug}, (channel) => {
      console.log(channel);
      let track = this.track = channel._track;
      this.name = channel.name;

      if (track && track.sources) {
        Sources.get({_id: channel._track.sources}, sources => {
          track.sources = sources;
        });
      }
    });

    var errorHandler = function() { ws = new WebSocket('wss://hive.media/channels/test'); }
    var ws = new WebSocket('wss://hive.media/channels/test');
    ws.onerror = errorHandler
    ws.onmessage = function(msg) {
      var data = JSON.parse(msg.data);
      console.log(data.params || data);
    };
  }
}

ChannelController.$inject = [
  '$stateParams',
  'Channels',
  'Sources'
]

export default ChannelController
