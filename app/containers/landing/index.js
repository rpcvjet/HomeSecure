
'use strict';

require('./_landing.scss');

require('angular').module('homeSecure')
.component('landing', {
  template: require('./landing.html'),
  controller:['$location', function($location){
    this.$onInit = () => {
      this.loginPage = () => {
        $location.path('/login');
      };
    };
  }],
});
