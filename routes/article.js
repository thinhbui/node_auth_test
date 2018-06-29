const express = require('express');
const router = express.Router();

const guard = require('express-jwt-permissions')();
const auth = require('../config/auth');
const Article = require('../models/article');
const User = require('../models/user');

//Check permission
const checkForPermissions = guard.check(['read']);

router.use(auth);
// router.use

router.get('/', checkForPermissions, (req, res) => {
  User.find({})
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

module.exports = router;
