'use strict';

require('angular').module('homeSecure')
.component('landing-header', {
  template: require('./landing-header.html'),
  controller: ['$log','$location', function($log, $location){
    this.$onInit = () => {
      this.loginButton = () => {
        $location.path('/login');
      };
      this.navClickHome = () => {
        $location.path('/landing');
      };
      this.navClickAbout = () => {
        $location.path('./about');
      };
    };
  }],
});
