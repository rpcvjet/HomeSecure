'use strict';

require('./_enrollee-item.scss');

require('angular').module('homeSecure')
.component('enrolleeItem', {
  template: require('./enrollee-item.html'),
  bindings: {
    enrollee: '<',
    handleSubmit: '<',
    handleDelete: '<',
  },
});
