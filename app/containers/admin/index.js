'use strict';

require('angular').module('homeSecure')
.component('admin', {
  template: require('./admin.html'),
  controller: ['$log', 'authService', '$location', AdminController ],
});

function AdminController($log, authService, $location) {
  this.$onInit = () => {
    console.log('are we connecting?');
    authService.tokenFetch()
    .then(() => $location.path('/dashboard'));

    this.loginUser = {email: '', password: ''};
    this.loginHandleSubmit = (user) => {
      authService.login(user)
      .then(token => {
        $log.log('success', token);
        this.loginUser = {email: '', password: ''};
        $location.path('/dashboard');
      })
      .catch($log.error);
    };
  };
}
