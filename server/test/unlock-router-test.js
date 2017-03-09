'use strict';

require('./lib/mock-env.js');

const {expect} = require('chai');
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js');
const baseURL = process.env.API_URL;
// const userMocks = require('./lib/userMocks.js');

describe('testing unlock router', function() {
  this.timeout(30000);
  before(serverControl.start);
  after(serverControl.stop);
  before(done => {
    superagent.get(`${baseURL}/api/login`)
    .auth('401@401.com', 'weare401')
    .then(res => {
      this.tempToken = res.text;
      done();
    })
    .catch(done);
  });

  before(done => {
    superagent.post(`${baseURL}/api/enrollee`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .field('name', 'Ken')
      .field('password', 'my voice is my password')
      .attach('image', `${__dirname}/lib/mock-assets/me3.jpg`)
      .then(res => console.log(res))
      .then(done);
  });

  describe('testing POST /api/unlock', () => {
    it('should respond with a  status of 200', (done) => {
      superagent.post(`${baseURL}/api/unlock`)
      .field('password', 'my voice is my password')
      .attach('image', `${__dirname}/lib/mock-assets/me3.jpg`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
    it('should respond with a  status of 401', (done) => {
      superagent.post(`${baseURL}/api/unlock`)
      .field('password', 'my voice is my password')
      .attach('image', `${__dirname}/lib/mock-assets/devon.jpg`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });
  });

}); //end of describe block
