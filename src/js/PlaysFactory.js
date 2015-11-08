'use strict';

function PlaysFactory ($resource) {
  return $resource('/plays/:_id');
}

PlaysFactory.$inject = [
  '$resource'
];

export default PlaysFactory
