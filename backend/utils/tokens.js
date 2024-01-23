const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

function generateNewPasswordToken(user) {
  return jwt.sign(user, process.env.NEW_PASSWORD_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateNewPasswordToken,
};
