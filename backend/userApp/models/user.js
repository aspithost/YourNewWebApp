const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  isverified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rights: {
    type: Number,
    default: 1
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 16
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User