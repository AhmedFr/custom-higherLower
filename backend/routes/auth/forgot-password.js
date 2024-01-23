var express = require('express');
var forgotPasswordRouter = express.Router();

forgotPasswordRouter.post('/', function(req, res, next) {
  res.send('forgot-password');
});

module.exports = forgotPasswordRouter;