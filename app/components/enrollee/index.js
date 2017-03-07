'use strict';

require('angular').module('homeSecure')
.component('galleryItem', {
  template: require('./enrollee.html'),
  controllerAs: 'enrolleeCtrl',
  bindings: {
    enrollee: '<',
    handleDelete: '<',
    handleUpdate: '<',
  },
});
