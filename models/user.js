const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  permissions: {
    type: Number
  }
});

module.exports = mongoose.model('user', UserSchema);
// html
