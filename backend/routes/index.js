var express = require("express");
var router = express.Router();
var sequelize = require("../config/sequelize");

router.get("/", async function (req, res, next) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  res.send("The API is working properly");
});

module.exports = router;
