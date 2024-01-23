var express = require("express");
var forgotPasswordRouter = express.Router();
const User = require("../../models/User");
const { sendForgotPasswordEmail } = require("../../utils/emails");
const crypto = require("crypto");

forgotPasswordRouter.post("/", async function (req, res, next) {
  if (!req.body.email) {
    res.status(400).send("Email is required");
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
    const forgotPasswordToken = crypto.randomBytes(64).toString("hex");
    await User.update(
      { forgotPasswordToken: forgotPasswordToken },
      { where: { email: req.body.email } },
    );
    const email = await sendForgotPasswordEmail(
      req.body.email,
      forgotPasswordToken,
    );
    if (!email.success) {
      res.status(400).send("Unable to send email");
      return;
    }
    res.status(200).send("Email sent");
  } catch (error) {
    if (error.errors) {
      res.status(400).send(error.errors[0].message);
      return;
    }
    res.status(400).send(error);
  }
});

module.exports = forgotPasswordRouter;
