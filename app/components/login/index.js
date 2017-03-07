'use strict';

require('angular').module('homeSecure')
.component('login', {
  template: require('./login.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
