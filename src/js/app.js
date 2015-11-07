'use strict';

import 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'angular-material-icons';
import 'angular-resource';

// controllers
import HomeController from './HomeController';
import ChannelController from './ChannelController';

// directives
import plyrDirective from './plyrDirective';

// services
import ChannelsFactory from './ChannelsFactory';

let dependencies = [
  'ngResource',
  'ngMaterial',
  'ngMdIcons',
  'ui.router'
];

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  // TODO: serve up index.html for /* requests to support html5Mode
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/channels.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('channel', {
      url: '/c/:slug',
      templateUrl: '/templates/channel.html',
      controller: 'ChannelController',
      controllerAs: 'channel'
    });
}

config.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];

angular
  .module('hive', dependencies)
  .config(config)
  .controller('HomeController', HomeController)
  .controller('ChannelController', ChannelController)
  .directive('plyr', plyrDirective)
  .factory('Channels', ChannelsFactory);

angular.bootstrap(document, ['hive']);
