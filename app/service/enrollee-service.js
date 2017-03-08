'use strict';

require('angular').module('homeSecure')
.service('enrolleeService', ['$log', '$http', 'authService', 'Upload', enrolleeService]);

function enrolleeService($log, $http, authService, Upload) {
  let enrolleeService = {};

  enrolleeService.create = (enrollee, image) => {
    let url = `${__API_URL__}/api/enrollee`;
    let config;

    return authService.tokenFetch()
    .then(token => {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };
      return config;
    })
    .then(config => {
      let uploadData = {
        url,
        headers: config.headers,
        data: {
          name: enrollee.name,
          image: image,
          password: enrollee.password,
        },
      };
      console.log(uploadData.data, 'looaoaoa');
      return Upload.upload(uploadData);
    })
    .then(res => res.data)
    .catch(err => console.log(err.message));
  };
  // return Upload.upload({
  //   url,
  //   headers: config.headers,
  //   data: {
  //     file: image.file,
  //   },
  // })
  // .then(image => {
  //
  //     return $http.post(url, config, image);
  //   })
  // })

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
    // .then(res => res.data);
    .then(res => {
      console.log(res.data, 'data in service');
      return res.data;
    });

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

enrolleeService.upload = (image) => {
return authService.tokenFetch()
.then(token => {
  let url = `${__API_URL__}/api/enrollee/`;
  let headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  return Upload.upload({
    url,
    headers,
    data: {
      file: image.file,
    }
  })
})
}
