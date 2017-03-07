'use strict';

require('angular').module('homeSecure')
.component('dashboard', {
  template: require('./dashboard.html'),
  controller: ['$log', '$location', 'enrolleeService', 'authService', function($log, $location, enrolleeService, authService){
    this.$onInit = () => {
      this.enrolleeLogout = () => {
        authService.logout()
        .then(() => $location.path('/login'));
      };
      enrolleeService.fetchAll()
      .then(enrollees => {
        this.enrollees = enrollees;
        this.enrollees = this.enrollees[0];
      }).catch($log.error);

      this.createEnrollee = {name: '', password: ''};
      this.createHandleSubmit = () => {
        enrolleeService.create(this.createEnrollee)
        .then(enrollee => {
          this.enrollees.push(enrollee);
          this.createEnrollee = {name: '', password: ''};
        }).catch($log.error);
      };

      this.itemHandleDelete = (enrollee) => {
        enrolleeService.delete(enrollee)
        .then(() => {
          this.enrollees = this.enrollees.filter(item => !(item._id == enrollee._id));
        })
        .catch($log.error);
      };

      this.itemHandleSelect = (enrollee) => {
        this.selected = enrollee;
      };


    };
  }],
});
