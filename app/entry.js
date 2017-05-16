'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const ngFileUpload  = require('ng-file-upload');
const uiBootstrap = require('angular-ui-bootstrap');

angular.module('homeSecure', [uiRouter, ngFileUpload, uiBootstrap])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('', '/landing');

  let routes = [
    {
      name: 'login',
      url: '/login',
      template: '<admin></admin>',
    },

    {
      name: 'signup',
      url: '/signup',
      template: '<signup></signup>',
    },

    {
      name: 'about-us',
      url: '/about-us',
      template: '<about-us></about-us>',
    },

    {
      name: 'dashboard',
      url: '/dashboard',
      template: '<dashboard></dashboard>',
    },
    {
      name: 'landing',
      url: '/landing',
      template: '<landing></landing>',
    },
  ];
  routes.forEach(route => $stateProvider.state(route));
}]);

require('./service/admin-service.js');
require('./service/enrollee-service.js');

require('./containers/admin');
require('./containers/dashboard');
require('./containers/landing');

require('./components/login');
require('./components/enrollee-create');
require('./components/enrollee-item');
require('./components/header');
