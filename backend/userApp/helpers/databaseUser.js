const User = require('../models/user');

exports.createUser = async (username, email, hashedPassword) => {
  return User.create({
    username,
    email,
    password: hashedPassword
  });
}

exports.deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId)
    .lean();
}

exports.findUserByEmail = (email) => {
  return User.findOne({ email: email });
}

exports.findUserById = (id) => {
  return User.findById(id)
    .lean();
}

exports.findUserByUsername = (username) => {
  return User.findOne({ username: username })
    .lean();
}

exports.findUserIfExists = (username, email) => {
  let regexUsername = new RegExp('^' + username + '$', 'i')
  let regexEmail = new RegExp('^' + email + '$', 'i')
  let usernameExists = User.findOne({ username: { $regex: regexUsername } }).lean();
  let emailExists = User.findOne({ email: { $regex: regexEmail } }).lean();
  return Promise.all([ usernameExists, emailExists ]);  
}

exports.patchUser = (userId, body) => {
  return User.findByIdAndUpdate(userId, body, { new: true })   
    .lean();
}

exports.updateRights = (username, newRights) => {
  return User.findOneAndUpdate(username, { rights: newRights }, { new: true })
    .lean();;
}