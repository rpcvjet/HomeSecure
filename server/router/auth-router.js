'use strict';

const {Router} = require('express');
const basicAuth = require('../lib/basic-auth.js');

const authRouter = module.exports = new Router();


//TODO signup functionality still needed on routes. Signup functionality unneeded if it's a single user

authRouter.get('/api/login', basicAuth, (req, res, next) => {
  res.send(req.token);
  next();
});
