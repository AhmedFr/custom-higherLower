var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/tokens");

router.post("/", async function (req, res, next) {
  if (!req.body.refreshToken) {
    res.status(400).send("Refresh token is required");
    return;
  }
  try {
    const user = await User.findOne({
      where: {
        refreshToken: req.body.refreshToken,
      },
    });
    if (!user) {
      res.status(400).send("Invalid refresh token");
      return;
    }
    const accessToken = generateAccessToken({
      email: user.dataValues.email,
      username: user.dataValues.username,
      id: user.dataValues.id,
    });
    res.status(200).send({
      email: user.dataValues.email,
      username: user.dataValues.username,
      refreshToken: user.dataValues.refreshToken,
      image: user.dataValues.image,
      accessToken: accessToken,
    });
  } catch (error) {
    if (error.errors) {
      res.status(400).send(error.errors[0].message);
      return;
    }
    res.status(400).send("Could not refresh token");
  }
});

module.exports = router;
