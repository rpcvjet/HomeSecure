'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const debug = require('debug')('homeSecure:enrollee-router');
const multer = require('multer');
const Enrollee = require('../model/enrollee.js');
const upload = multer({dest:`${__dirname}/../assets/image`});
const bearerAuth = require('../lib/bearer-auth.js');
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));


const enrolleeRouter = module.exports = new Router();

enrolleeRouter.post('/api/enrollee', bearerAuth, jsonParser, upload.single('image'), (req, res, next) => {
  debug('POST /api/enrollee');
  // TODO: upload to kairos here then , firebase then create enrollee
  fs.readFileAsync(req.file.path)
  .then(buf => {
    let base64image = buf.toString('base64');
    console.log(base64image);
  })
  .then()
  // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOO',req.file);
  .then(new Enrollee(req.body).save())
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
