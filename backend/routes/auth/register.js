var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { isPasswordValid } = require("../../utils/password");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/tokens");

router.post("/", async function (req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);

    if (!isPasswordValid(req.body.password)) {
      res.status(400).send("Invalid password format");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const refreshToken = generateRefreshToken({ email: req.body.email });
    const gravatarHash = crypto
      .createHash("sha256")
      .update(req.body.email.toLowerCase())
      .digest("hex");

    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      refreshToken: refreshToken,
      image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
    });

    const accessToken = generateAccessToken({
      email: req.body.email,
      username: req.body.username,
      id: newUser.dataValues.id,
    });
    res.status(201).send({
      email: newUser.dataValues.email,
      username: newUser.dataValues.username,
      refreshToken: newUser.dataValues.refreshToken,
      image: newUser.dataValues.image,
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
