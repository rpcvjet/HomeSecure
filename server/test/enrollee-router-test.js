'use strict';

require('./lib/mock-env.js');
const {expect} = require('chai');
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js');

let baseURL = process.env.API_URL;

describe('testing page router', function(){
  this.timeout(20000);
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
  //***********************POST TESTS*******************************************
  it('should create a Enrollee', (done) => {
    superagent.post(`${baseURL}/api/enrollee`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .field('name', 'Ken')
      .field('password', 'my voice is my password')
      .attach('image', `${__dirname}/lib/mock-assets/me3.jpg`)
      .then(res => {
        expect(res.status).to.equal(200);
        // expect(!!res.body.id).to.equal(true);
        expect(res.body.name).to.equal('Ken');
        expect(res.body.password).to.equal('my voice is my password');
        done();
      })
      .catch(done);
  });

  it('should respond with a 401', (done) => {
    superagent.post(`${baseURL}/api/enrollee`)
    .set('Authorization', `Bearer ${this.notmytoken}`)
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(401);
      done();
    })
    .catch(done);
  });

  it('should respond with a 400', (done) => {
    superagent.post(`${baseURL}/api/enrollee`)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .field('aacac', 'Ken')
    .field('password', 'my voice is my password')
    .attach('image', `${__dirname}/lib/mock-assets/me3.jpg`)
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(400);
      done();
    })
    .catch(done);
  });
//********************************GET TESTS*****************************************
  it('should respond with 200 and array of pages', (done) => {
    superagent.get(`${baseURL}/api/enrollee`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    })
    .catch(done);
  });

  it('shuold update the page', (done) => {
    this.tempPage.title = 'lulwat';

    superagent.put(`${baseURL}/api/enrollee`)
    .send(this.tempPage)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      this.tempPage = res.body;
      expect(res.status).to.equal(200);
      expect(!!res.body.id).to.equal(true);
      expect(res.body.title).to.equal('lulwat');
      expect(res.body.content).to.equal('# hello\n* cool\n* beans');
      expect(res.body.showInNav).to.equal(true);
      done();
    })
    .catch(done);

  });
//*********************************DELETE TESTS******************************************88
  it('should respond with a 401 error', (done) => {
    superagent.delete(`${baseURL}/api/enrollee/${this.tempPage.id}`)
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(401);
      done();
    })
    .catch(done);
  });

  it('should delete the page', (done) => {
    superagent.delete(`${baseURL}/api/enrollee/${this.tempPage.id}`)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
  });
});
