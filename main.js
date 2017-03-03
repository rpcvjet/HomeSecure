'use strict';

require('dotenv').config;
const debug = require('debug')('HomeSecure:server');
const server = require('./server');

server.listen(process.env.PORT, () => {
  debug('Running server');
  console.log('Server is up at port, ', process.env.PORT);
});
