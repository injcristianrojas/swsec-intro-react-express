const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./db.js');

const JWTSECRET = "123";
const JWTEXPIRATION = "1800s";

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: '*'
}));

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

function getMessages() {
  let query = db.prepare("select * from messages");
  return query.all();
}

app.get("/", (req, res) => {
  res.json({ "message": "Index. Nothing to see here." })
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let query = db.prepare("select * from users where username = '" + username + "' and password = '" + password + "'");
  let results = query.all();

  if (results.length < 1) {
    res.status(401).json({ "error": "unauthorized" });
  } else {
    res.json({ 'token': jwt.sign({ username: results[0].username }, JWTSECRET, { expiresIn: JWTEXPIRATION }) });
  }
});

// Users

app.get("/api/users/type/:type", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  let query = db.prepare("select * from users where user_type = " + req.params.type);
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

  res.json({
    "message": "success",
    "data": getMessages()
  });

});

app.post("/api/messages/new", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }
  
  try {
    db.exec(`INSERT INTO messages(message) VALUES ('${req.body.message}')`);
  } catch (err) {
    if (!db.inTransaction) throw err; // (transaction was forcefully rolled back)
    res.status(500).json({
      "message": "Error:" + err
    });
    return;
  }

  res.json({
    "message": "success",
    "data": getMessages()
  });

})

app.listen(9000, () => {
  console.log("API server running on port 9000");
});

module.exports = app