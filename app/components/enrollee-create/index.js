'use strict';

require('angular').module('homeSecure')
.component('enrolleeCreate', {
  template: require('./enrollee-create.html'),
  // controllerAs: 'enrolleeCreateCtrl',
  bindings: {
    enrollee: '<',
    handleSubmit: '<',
  },
});
