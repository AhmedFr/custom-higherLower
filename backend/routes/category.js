var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("get category");
});

router.post("/", function (req, res, next) {
  res.send("post category");
});

router.delete("/", function (req, res, next) {
  res.send("delete category");
});

module.exports = router;
