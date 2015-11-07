'use strict';

class HomeController {
  constructor(Channels) {
    this.channels = [];

    Channels.query(channels => this.channels = channels);
  }
}

HomeController.$inject = [
  'Channels'
];

export default HomeController
