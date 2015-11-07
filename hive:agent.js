var Remote = require('maki-remote');
var Source = new Remote('http://localhost:9200/sources');
var Play = new Remote('http://localhost:9200/plays');

function playTrack() {
  var videoID = 'dQw4w9WgXcQ';
  Play.create({
    _source: 'foo'
  }, function(err, play) {
    console.log(err || play);
  });
}

// TODO: replace with serverside tracking of timestamps
setInterval(playTrack, 5000);
