const jwt = require("jsonwebtoken");

function isAuthorized(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return false;
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      return decoded;
    }
  } catch (error) {
    return false;
  }
  return false;
}

module.exports = { isAuthorized };
