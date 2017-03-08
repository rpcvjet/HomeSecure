'use strict';

require('angular').module('homeSecure')
.component('enrolleeItem', {
  template: require('./enrollee-item.html'),
  bindings: {
    enrollee: '<',
    handleSubmit: '<',
    handleDelete: '<',
  },
});
