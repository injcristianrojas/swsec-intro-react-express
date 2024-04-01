const express = require('express');
const cors = require('cors');
const {db, getMessages} = require('./helpers/db.js');
const {isTokenValid, signToken} = require('./helpers/jwt.js');

const PORT = 9000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: '*'
}));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
  swaggerOptions: {
      url: "/api/v2/api-docs/swagger.json",
  },
}
app.get("/api/v2/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
app.use('/api/v2/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));

app.get("/", (req, res) => {
  res.json({ "message": "Index. Nothing to see here." })
});

app.post("/api/v2/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let query = db.prepare("select * from users where username = '" + username + "' and password = '" + password + "'");
  let results = query.all();

  if (results.length < 1) {
    res.status(401).json({ "error": "unauthorized" });
  } else {
    res.json({ 'token': signToken(username) });
  }
});

// Users

app.get("/api/v1/users/type/:type", (req, res) => {

  let query = db.prepare("select username, password, user_type from users where user_type = " + req.params.type);
  let results = query.all();

  res.json({
    "message": "success",
    "data": results
  });

});

app.get("/api/v2/users/type/:type", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  let query = db.prepare("select username, user_type from users where user_type = " + req.params.type);
  let results = query.all();

  res.json({
    "message": "success",
    "data": results
  });

});

// Posts

app.get("/api/v2/messages", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  res.json({
    "message": "success",
    "data": getMessages()
  });

});

app.post("/api/v2/messages/new", (req, res) => {
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

app.listen(PORT, () => {
  console.log("API server running on port 9000");
});

module.exports = app