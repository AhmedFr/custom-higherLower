var express = require("express");
var categoriesRouter = express.Router();

categoriesRouter.get("/", function (req, res, next) {
  res.send("categories");
});

module.exports = categoriesRouter;
