'use strict';

require('dotenv').config();
const debug = require('debug')('HomeSecure:server');
const server = require('./server');





server.listen(process.env.PORT, () => {
  debug('Running server cool');
  console.log('Server is up at port, ', process.env.PORT);
});
