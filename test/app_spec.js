var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', function() {
  describe('/products', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/products')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('/products', function() {
    it('responds with json', function(done) {
      chai.request(app)
        .get('/products')
        .end(function(err, res) {
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/inventory', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/inventory')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/inventory', function() {
    it('responds with json', function(done) {
      chai.request(app)
        .get('/inventory')
        .end(function(err, res) {
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/foo/bar', function() {
    it('responds with status 404 for invalid endpoints', function(done) {
      chai.request(app)
        .get('/foo/bar')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});