const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const keys = require('../ultils/constants');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.use(auth);

router.get(
  '/',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json('hihi');
  }
);
router.get('/', (req, res) => {
  User.find().then(user => {
    res.json(user);
  });
});
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(email, password);

  //Find user
  User.findOne({ username })
    // .populate('role', ['name', 'permissions'])
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      } else if (user.password === password) {
        const payload = {
          id: user._id,
          username: user.username,
          password: user.password,
          name: user.name,
          email: user.email
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600 * 6
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
        // return res.json({ user });
      }
    });
});

//regiter
router.post('/register', (req, res) => {
  const { name, email, password, username } = req.body;
  console.log(req.body);
  User.findOne({ username })
    .then(user => {
      // console.log(user);

      if (user === null) {
        const newUser = new User(req.body);
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      } else {
        res.json('Email already exist');
      }
    })
    .catch(err => res.status(404).json(err));
});
module.exports = router;
