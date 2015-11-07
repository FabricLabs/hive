'use strict';

function plyrDirective() {
  return {
    template: '<div class="player"><div data-video-id="dQw4w9WgXcQ" data-type="youtube"></div></div>',
    link: function (scope, el, attrs) {
      plyr.setup();

      // document.querySelectorAll('.player')[0].plyr.play();
    }
  }
}

export default plyrDirective
