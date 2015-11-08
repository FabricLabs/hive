var hive = require('./lib/hive');

hive.start(function() {
  hive.app.get('/get-started', function(req, res, next) {
    hive.resources.Peer.Model.find({}).exec(function(err, peers) {
      res.render('about', {
        peers: peers
      });
    });
  });
});
