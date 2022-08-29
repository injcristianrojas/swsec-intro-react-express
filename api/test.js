const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
let should = chai.should();

chai.use(chaiHttp);

describe("Basic tests", function () {

  it("GET / should have status code 200", function (done) {
    chai.request(app)
      .get("/")
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

  it("Legit login should work", function (done) {
    chai.request(app)
      .post("/api/login")
      .send({ username: "admin", password: "123" })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

});