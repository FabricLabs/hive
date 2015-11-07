'use strict';

class ChannelController {
  constructor($stateParams, Channels) {
    let {slug} = $stateParams;

    this.track = null;
    this.name = null;

    Channels.get({slug}, (channel) => {
      console.log(channel);
      this.name = channel.name;
      this.track = channel._track;
    });
  }
}

ChannelController.$inject = [
  '$stateParams',
  'Channels'
]

export default ChannelController
