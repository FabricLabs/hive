'use strict';

class CategoryController {
  constructor($scope, $stateParams, Categorys, Sources) {
    let vm = this;
    let {slug} = $stateParams;

    this.track = {id: 'dQw4w9WgXcQ'};
    this.name = null;
    this.source = null;
    this.category = null;

    Categories.get({slug}, (category) => {
      console.log('Category info:', category);
      let track;

      this.category = category;

      if (category._track) {
        track = this.track = category._track;
      }
      this.name = category.name;

      if (track && track.sources) {
        Sources.get({_id: category._track.sources}, sources => {
          track.sources = sources;
        });
      }
    });

    var protocol = (location.protocol === 'http:') ? 'ws:' : 'wss:';
    var hostname = (location.port === 3000) ? 'localhost:6333' : 'hive.media';
    var socketPath = `${(protocol)}//${hostname}/categories/test`;
    var errorHandler = function() { ws = new WebSocket(socketPath); }
    var ws = new WebSocket(socketPath);
    ws.onerror = errorHandler
    ws.onmessage = (msg) => {
      var data = JSON.parse(msg.data);
      console.log(data);
      if (data && data.params) {
        let {category, ops} = data.params;
        if (category === '/categories/test') {
          ops.forEach(op => {
            if (op.op === 'replace' && op.path === '/_track') {
              this.category._track = op.value;
            }
          })

          $scope.$apply();
        }
      }
    };
  }

  updateTrack(trackId) {
    this.track.id = trackId;
  }
}

CategoryController.$inject = [
  '$scope',
  '$stateParams',
  'Categories',
  'Sources'
]

export default CategoryController
