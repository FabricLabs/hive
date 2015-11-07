'use strict';

function plyrDirective() {
  return {
    scope: {
      source: '='
    },
    template: '<div class="player"><div data-video-id="dQw4w9WgXcQ" data-type="youtube"></div></div>',
    link: function (scope, el, attrs) {
      // plyr.setup();
      console.log(scope);
      // document.querySelectorAll('.player')[0].plyr.play();
    }
  }
}

export default plyrDirective
