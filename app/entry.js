'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

angular.module('homeSecure', [uiRouter])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('', '/login');

  let routes = [
    {
      name: 'login',
      url: '/login',
      template: '<login></login>',
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
  ];
  routes.forEach(route => $stateProvider.state(route));
}]);

require('./service/admin-service.js');
// require('./service/enrollee-service.js');

require('./containers/dashboard');
require('./containers/login');

require('./components/login');
