'use strict';

require('angular').module('homeSecure')
.component('admin', {
  template: require('./login.html'),
  controller: ['$log', 'authService', '$location', AdminController ],
});

function AdminController($log, authService, $location) {
  this.$onInit = () => {

    authService.tokenFetch()
    .then(() => $location.path('/dashboard'));

    this.loginUser = {email: '', password: ''};
    this.loginHandleSubmit = (user) => {
      authService.logIn(user)
      .then(token => {
        $log.log('success', token);
        this.loginUser = {email: '', password: ''};
        $location.path('/dashboard');
      })
      .catch($log.error);
    };
  };
}
