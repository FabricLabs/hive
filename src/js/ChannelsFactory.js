'use strict';

function ChannelsFactory ($resource) {
  return $resource('/channels/:slug');
}

ChannelsFactory.$inject = [
  '$resource'
];

export default ChannelsFactory
