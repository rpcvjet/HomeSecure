'use strict';

require('angular').module('homeSecure')
.component('login', {
  template: require('./login.html'),
  controllerAs: 'loginCtrl',
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
