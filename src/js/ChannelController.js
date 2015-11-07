'use strict';

class ChannelController {
  constructor($stateParams) {
    this._id = $stateParams.channelId;
  }
}

ChannelController.$inject = [
  '$stateParams'
]

export default ChannelController
