const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const user = require('./routes/user');
const aricle = require('./routes/article');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Passport init
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json('hihi');
});
//mongo
mongoose
  .connect('mongodb://localhost/demo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

require('./config/passport')(passport);

app.use('/users', user);
app.use('/articles', aricle);

app.listen(3000, () => {});
