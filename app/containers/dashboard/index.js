// 'use strict';
//
// require('angular').module('homeSecure')
// .component('dashboard', {
//   template: require('./dashboard.html'),
//   controller: ['$log', '$location', 'enrolleeService', 'authService', function($log, $location, enrolleeService, authService){
//     this.$onInit = () => {
//       this.enrolleeLogout = () => {
//         authService.logout()
//         .then(() => $location.path('/login'));
//       };
//
//       enrolleeService.fetchAll()
//       .then(enrollee => {
//         this.enrollees = enrollees;
//         this.selected = this.enrollees[0];
//       })
//
// });
