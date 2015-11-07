'use strict';

function SourcesFactory ($resource) {
  return $resource('/sources/:_id');
}

SourcesFactory.$inject = [
  '$resource'
];

export default SourcesFactory
