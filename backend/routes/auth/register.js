var express = require('express');
var router = express.Router();
const User = require('../../models/User');

router.post('/', async function(req, res, next) {
  try {
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    res.status(201).json(newUser);
  } catch(error) {
    res.status(400).json(error.errors[0].message);
  }
});

module.exports = router;