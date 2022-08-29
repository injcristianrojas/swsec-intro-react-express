const { expect } = require('chai');
const chai = require('chai');
const supertest = require('supertest');

const app = require('./app');

describe("Tests", function () {

  it("GET / should have status code 200", function (done) {
    supertest(app)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        done()
      });
  });

  it("Legit login should work", function (done) {
    supertest(app)
      .post("/api/login")
      .type("form")
      .send({
        "username": "admin",
        "password": "123"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        done()
      });
  });

});