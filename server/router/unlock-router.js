'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const debug = require('debug')('homeSecure:enrollee-router');
const multer = require('multer');
// const Enrollee = require('../model/enrollee.js');
const upload = multer({dest:`${__dirname}/../assets/image`});
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const superagent = require('superagent');
const createError = require('http-errors');



const unlockRouter = module.exports = new Router();

unlockRouter.post('/api/unlock', jsonParser, upload.single('image'), (req, res, next) => {
  debug('POST enrollee');
  fs.readFileAsync(req.file.path)
  .then(buf => {
    let base64image = buf.toString('base64');
    return base64image;
  })
  .then((base64image) => {
    return superagent.post('https://api.kairos.com/recognize')
    .set('app_id', process.env.app_id)
    .set('app_key', process.env.app_key)
    .send({
      'image' : base64image,
      'gallery_name': '401Practice',
      'threshold': '0.75',
      'max_num_results': 1,
    });
  })
  .then((response) => {
    if (response.body.images[0].transaction.status === 'failure')
      throw createError(401, 'transaction failed, face did not match');
    res.sendStatus(200);
    let enrolleeID = response.body.images[0].transaction.subject_id;
    return enrolleeID;
  })
  .then(enrolleeID => {
    Enrollee.findById(enrolleeID)
    .then(value => {
      return value;
    })
    .then(value => {
      let enrolleePw = value.password;
      if(enrolleePw == req.body.password){
        res.sendStatus(200);
      }
      throw createError(401, 'transaction failed, passwords did not match');
    })
    .catch(next);
  })
  .catch(err =>{
    console.log(err);
    res.sendStatus(401);
  });

});
