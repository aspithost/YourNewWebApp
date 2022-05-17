const PasswordHash = require('../models/passwordHash');

exports.createPasswordHash = (userId) => {
    const hash = Math.random().toString(36).slice(2);
    return PasswordHash.create({
        passwordHash: hash,
        user: userId
    });
}

exports.deleteOldPasswordHash = (userId) => {
    return PasswordHash.findOneAndDelete({ user: userId })
}

exports.getPasswordHash = (hash) => {
    return PasswordHash.findOne({ passwordHash: hash });
}