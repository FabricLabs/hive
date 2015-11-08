var Remote = require('maki-remote');
var Agent = require('./lib/agent');

/**/
var base = 'http://localhost:6333';
/*/
var base = 'https://hive.media';
/**/

var Channels = new Remote(base + '/channels');

Channels.query({}, function(channels) {
  var agents = channels.map(function(channel) {
    var agent = new Agent();

    agent.start();
    
    return agent;
  });
});
