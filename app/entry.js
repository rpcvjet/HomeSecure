'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const ngFileUpload  = require('ng-file-upload');

angular.module('homeSecure', [uiRouter, ngFileUpload])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('', '/login');

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
    // {
    //   name: 'enrollee',
    //   url: '/enrollee-signup',
    //   template: '<create-enrollee></create-enrollee>'
    // }
  ];
  routes.forEach(route => $stateProvider.state(route));
}]);

require('./service/admin-service.js');
require('./service/enrollee-service.js');

require('./containers/admin');
require('./containers/dashboard');

require('./components/login');
require('./components/enrollee-create');
require('./components/enrollee-item');
require('./components/header');
