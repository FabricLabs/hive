'use strict';

function plyrDirective() {
  return {
    scope: {
      trackId: '='
    },
    replace: true,
    template: '<div class="videoWrapper"></div>',
    link: function (scope, el, attrs) {
      scope.$watch('trackId', function (nextTrack) {
        console.log(`loading ${nextTrack}`);
        let iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${nextTrack}?autoplay=1`;
        el.empty()
        el.append(iframe);
      });
    }
  }
}

export default plyrDirective
