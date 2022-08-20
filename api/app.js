const express = require("express");
const app = express();

app.get("/testAPI", function(req, res) {
  res.send("API is working properly");
});

app.get("/", function(req, res) {
  res.json({"message":"Index. Nothing to see here."})
});

app.listen(9000, () => {
  console.log("API server running on port 9000");
});