'use strict';


require('./_dashboard.scss');

require('angular').module('homeSecure')
.component('dashboard', {
  template: require('./dashboard.html'),
  controller: ['$log', '$location', 'enrolleeService', 'authService', function($log, $location, enrolleeService, authService){
    this.$onInit = () => {
      // this.enrolleeLogout = () => {
      //   authService.logout()
      //   .then(() => $location.path('/login'));
      // };
      enrolleeService.fetchAll()
      .then(enrollees => {
        this.enrollees = enrollees;
      }).catch($log.error);

      this.createEnrollee = {name: '', password: '', img: ''};
      this.createHandleSubmit = () => {
        console.log(this.createEnrollee, 'what is in here????');
        enrolleeService.create(this.createEnrollee, this.createEnrollee.img)
        .then(enrollee => {
          this.enrollees.push(enrollee);
          this.createEnrollee = {name: '', password: '', img: ''};
        }).catch($log.error);
      };

      this.itemHandleDelete = (enrollee) => {
        enrolleeService.delete(enrollee)
        .then(() => {
          this.enrollees = this.enrollees.filter(item => item.id !== enrollee.id);
        })
        .catch($log.error);
      };

      this.itemHandleSelect = (enrollee) => {
        this.selected = enrollee;
      };


    };
  }],
});
