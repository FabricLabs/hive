var assert = require('assert');

describe('Hive', function() {
  describe('web server', function() {
    it('should run', function(done) {
      var hive = require('../lib/hive');
      hive.start(function() {
        assert('ok');
        done();
      });
    });
  });
});
