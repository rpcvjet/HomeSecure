'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const debug = require('debug')('homeSecure:house-router');

const House = require('../model/house.js'); //TODO add house model
const bearerAuth = require('../lib/bearer-auth.js');

const houseRouter = module.exports = new Router();

//TODO double check post functionality this varies from what was used in class :P
houseRouter.post('/api/house', bearerAuth, jsonParser, (req, res,next) => {
  debug('POST /api/house');
  new House(req.body).save()
  .then(house => res.json(house))
  .catch(next);
});

houseRouter.get('/api/house', (req, res, next) => {
  debug('GET /api/house/:id');
  House.findById(req.params.id)
  .then(house => res.json(house)) //TODO only one house available to user so no plural usage here
  .catch(next);
});


//TODO double check this functionality due to one house available per user
houseRouter.delete('/api/house/:id', bearerAuth, (req, res, next) => {
  debug('DELETE /api/house');
  House.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
