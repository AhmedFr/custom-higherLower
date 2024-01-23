var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.send('new-password');
});

module.exports = router;