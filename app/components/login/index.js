'use strict';
require('./_login.scss');

require('angular').module('homeSecure')
.component('login', {
  template: require('./login.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
  controller:['$location', function($location){
    this.$onInit = () => {
      this.goHome = () => {
        $location.path('/landing');
      };
    };
  }],
});
