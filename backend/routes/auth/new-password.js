var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

router.post("/", async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("Email or password missing");
    return;
  }
  if (!req.body.token) {
    res
      .status(400)
      .send("Token missing, make sure to use the link in your email");
    return;
  }
  try {
    const trueUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!trueUser) {
      res.status(400).send("User not found");
      return;
    }
    if (trueUser.dataValues.forgotPasswordToken !== req.body.token) {
      res.status(400).send("Invalid token");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.update(
      { password: hashedPassword },
      { where: { email: req.body.email } },
    );
    res.status(200).send("Password updated");
  } catch (error) {
    if (error.errors) {
      res.status(400).send(error.errors[0].message);
      return;
    }
    res.status(400).send(error);
  }
});

module.exports = router;
