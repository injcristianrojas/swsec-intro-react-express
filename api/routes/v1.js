const express = require('express');
const router = express.Router();

const { getUsersByTypeV1 } = require("../helpers/db.js");

router.get("/users/type/:type", (req, res) => {

  res.json({
    "message": "success",
    "data": getUsersByTypeV1(req.params.type)
  });

});

module.exports = router;