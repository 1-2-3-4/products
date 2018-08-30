var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
  describe('/products', () => {
    it('responds with status 200', (done) => {
      chai.request(app)
        .get('/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('/products', () => {
    it('responds with json', (done) => {
      chai.request(app)
        .get('/products')
        .end((err, res) => {
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/products/:id', () => {
    it('responds with json', (done) => {
      chai.request(app)
        .get('/products/2')
        .end((err, res) => {
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/products/:id/inventory', () => {
    it('responds with json', (done) => {
      chai.request(app)
        .get('/products/2/inventory')
        .end((err, res) => {
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/inventory', () => {
    it('responds with status 200', (done) => {
      chai.request(app)
        .get('/inventory')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/inventory', () => {
    it('responds with json', (done) => {
      chai.request(app)
        .get('/inventory')
        .end((err, res) => {
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/foo/bar', () => {
    it('responds with status 404 for invalid endpoints', (done) => {
      chai.request(app)
        .get('/foo/bar')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});