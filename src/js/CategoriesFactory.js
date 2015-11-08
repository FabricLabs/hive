'use strict';

function CategoriesFactory ($resource) {
  return $resource('/categories/:slug');
}

CategoriesFactory.$inject = [
  '$resource'
];

export default CategoriesFactory
