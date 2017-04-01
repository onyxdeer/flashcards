const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../../server/server.js');
const should = chai.should();

chai.use(chaiHttp)

describe('Api Endpoints Test', function() {
  it('should list ALL noris on /api/noris GET', function(done){
    chai.request(app)
    .get('/api/noris')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});