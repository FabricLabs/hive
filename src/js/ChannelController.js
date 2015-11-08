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

      Sources.get({_id: channel._track.sources}, sources => {
        track.sources = sources;
      });
    });
  }
}

ChannelController.$inject = [
  '$stateParams',
  'Channels',
  'Sources'
]

export default ChannelController
