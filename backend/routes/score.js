var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  res.send("post score");
});

router.get("/", function (req, res, next) {
  res.send("get score");
});

module.exports = router;
