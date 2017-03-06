'use strict';

require('dotenv').config();
const debug = require('debug')('HomeSecure:server');
const server = require('./server');
const http = require('http');
const base64 = require('base64-stream');
const fs = require('fs');


// var img = 'http://i.imgur.com/hIN8ZWn.jpg';
// http.get(img, function(res) {
//   if (res.statusCode === 200)
//     res.pipe(base64.encode()).pipe();
// });

const originalImage = 'assets/me3.jpg';

fs.readFile(originalImage, 'base64', (err, data) =>{
  if (err) throw err;
  console.log(data);  //can now take base64 image and push or whatever
});


server.listen(process.env.PORT, () => {
  debug('Running server cool');
  console.log('Server is up at port, ', process.env.PORT);
});
