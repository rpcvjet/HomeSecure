'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const debug = require('debug')('homeSecure:enrollee-router');

const Enrollee = require('../model/enrollee.js');
const bearerAuth = require('../lib/bearer-auth.js');

const enrolleeRouter = module.exports = new Router();

enrolleeRouter.post('/api/enrollee', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST /api/enrollee');
  new Enrollee(req.body).save()
  .then(enrollee => res.json(enrollee))
  .catch(next);
});

enrolleeRouter.get('/api/enrollee', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET all /api/enrollee');
  Enrollee.fetchAll()
  .then(enrollees => res.json(enrollees))
  .catch(next);
});

enrolleeRouter.get('/api/enrollee/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET /api/enrollee/:id');
  Enrollee.findById(req.params.id)
  .then(enrollee => res.json(enrollee))
  .catch(next);
});

enrolleeRouter.put('/api/enrollee/:id', bearerAuth, jsonParser, (req, res, next) => {
  //TODO further checks needed on functionality. Still unsure on how to adjust this put request
  debug('PUT /api/enrollee/:id');
  Enrollee.findByIdAndDelete(req.params.id)
  .then(new Enrollee(req.body).save())
  .then(enrollee => res.json(enrollee))
  .catch(next);
});
