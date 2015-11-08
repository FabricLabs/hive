var config = require('../config');
var YouTube = require('youtube-api');

YouTube.authenticate({
  type: 'key',
  key: config.services.youtube.key
});

module.exports = YouTube;
