'use strict';

require('angular').module('homeSecure')
.service('enrolleeService', ['$log', '$http', 'authService', enrolleeService]);

function enrolleeService($log, $http, authService) {
  let enrolleeService = {};

  enrolleeService.create = (enrollee) => {
    return authService.tokenFetch()
    .then(token => {
      let url = `${__API_URL__}/api/enrollee`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };
      return $http.post(url, enrollee, config);
    })
    .then(res => res.data);
  };

  enrolleeService.fetchAll = () => {
    return authService.tokenFetch()
    .then(token => {
      let url = `${__API_URL__}/api/enrollee`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };
      return $http.get(url, config);
    })
    .then(res => res.data);
  };

  enrolleeService.delete = (enrollee) => {
    return authService.tokenFetch()
    .then(token => {
      let url = `${__API_URL__}/api/enrollee/${enrollee.id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.delete(url, config);
    })
    .then(res => res.data);
  };
  return enrolleeService;
}
