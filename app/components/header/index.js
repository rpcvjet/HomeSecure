'use strict';

require('./_header.scss');

require('angular').module('homeSecure')
.component('header', {
  template: require('./header.html'),
  controller: ['$log', '$location', 'authService', function($log, $location, authService){
    this.$onInit = () => {
      this.enrolleeLogout = () => {
        authService.logout()
        .then(() => $location.path('/login'));
      };
    };
  }],

});
