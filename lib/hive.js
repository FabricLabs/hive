var config = require('../config');

var Maki = require('maki');
var hive = new Maki(config);

var Passport = require('maki-passport-local');
var passport = new Passport({
  resource: 'Person'
});

var Auth = require('maki-auth-simple');
var auth = new Auth({
  resource: 'Person',
  capabilities: {
    'publish': ['admin']
  }
});

hive.use(passport);
hive.use(auth);

var Person = hive.define('Person', require('../resources/person'));

module.exports = hive;
