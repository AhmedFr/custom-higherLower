var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../utils/tokens");

router.post("/", async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("Email and password are required");
    return;
  }
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(400).send("User not found");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password,
    );
    if (!validPassword) {
      res.status(400).send("Invalid password");
      return;
    }
    const accessToken = generateAccessToken({
      email: req.body.email,
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
    res.status(400).send(error);
  }
});

module.exports = router;
