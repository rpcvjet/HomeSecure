'use strict';

const http = require('http');
const base64 = require('base64-stream');
// const fs = require('fs');


var img = './assets/me3.jpg';
http.get(img, function(res) {
    if (res.statusCode === 200)
      res.pipe(base64.encode()).pipe(process.stdout);
});
