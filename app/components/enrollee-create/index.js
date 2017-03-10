'use strict';

require('./_enrollee-create.scss');


require('angular').module('homeSecure')
.component('enrolleeCreate', {
  template: require('./enrollee-create.html'),
  bindings: {
    enrollee: '<',
    handleSubmit: '<',
  },
  controller: ['$log', function($log){
    $log.log('inside enrollee create');
    this.showModal = false;
  }],
});
