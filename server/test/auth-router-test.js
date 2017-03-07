'use strict';

require('./lib/mock-env.js');

const {expect} = require('chai');
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js');
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

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('', 'blaaarg')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('bluuurg', '')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should return 401', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth('401@401.com', 'bloop')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });
  });
});
