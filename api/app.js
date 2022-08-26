const express = require("express");
const app = express();
const db = require("./db.js");

app.get("/testAPI", function (req, res) {
  res.send("API is working properly");
});

app.get("/", function (req, res) {
  res.json({ "message": "Index. Nothing to see here." })
});

app.get("/api/users", (req, res) => {
  const sql = "select * from users"
  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

app.listen(9000, () => {
  console.log("API server running on port 9000");
});

module.exports = app