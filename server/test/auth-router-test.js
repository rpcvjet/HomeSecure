'use strict';

require('./mock-env.js');

const {expect} = require('chai');
const superagent = require('superagent');
const serverControl = require('./server-control.js');
const baseURL = process.env.API_URL;

describe('testing auth router', () => {
  before(serverControl.start);
  after(serverControl.stop);

  describe('testing GET /api/login', () => {
    it('should respond with a token and status of 200', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('401@401.com', 'weare401')
      .then(res => {
        console.log('TOKEN', res);
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
});
