const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./db.js');

const JWTSECRET = "c700939e170c4854a02dd864e12355c295486bb5f0169063c2d8ab9cb612b1909dff0870596c2523f1c0a63e4683a96281b5db449035a7eb8ea9e166d2214443";
const JWTEXPIRATION = "1800s";

const app = express();
app.use(express.json());
app.use(cors());

function isTokenValid(req) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], JWTSECRET, (err, decode) => {
      if (err) return false;
    });
  } else {
    return false;
  }
  return true;
}

app.get("/testAPI", function (req, res) {
  res.send("API is working properly")
});

app.get("/", function (req, res) {
  res.json({ "message": "Index. Nothing to see here." })
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = "select * from users where username = '" + username + "' and password = '" + password + "'";
  let query = db.prepare(sql);
  let results = query.all();

  if (results.length < 1) {
    res.status(401).json({ "error": "unauthorized" });
  } else {
    res.json({ 'token': jwt.sign({ username: results[0].username }, JWTSECRET, { expiresIn: JWTEXPIRATION }) });
  }
});

// Users

app.get("/api/users", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  const sql = "select * from users";
  let query = db.prepare(sql);
  let results = query.all();

  res.json({
    "message": "success",
    "data": results
  });

});

// Posts

app.get("/api/messages", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  const sql = "select * from messages";
  let query = db.prepare(sql);
  let results = query.all();

  res.json({
    "message": "success",
    "data": results
  });

});

app.listen(9000, () => {
  console.log("API server running on port 9000");
});

module.exports = app