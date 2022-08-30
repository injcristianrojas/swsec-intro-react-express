const express = require("express");
const app = express();
const db = require("./db.js");

app.use(express.json());

app.get("/testAPI", function (req, res) {
  res.send("API is working properly")
});

app.get("/", function (req, res) {
  res.json({ "message": "Index. Nothing to see here." })
});

app.get("/api/users", (req, res) => {
  const sql = "select * from users"

  let query = db.prepare(sql);
  let results = query.all();

  res.json({
    "message": "success",
    "data": results
  });

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
    res.send("" + results[0].username);
  }
});

app.listen(9000, () => {
  console.log("API server running on port 9000");
});

module.exports = app