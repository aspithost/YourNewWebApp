const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign({
        userId: user._id,
        username: user.username,
        rights: user.rights
    },
        process.env.JWT_ACCESS_KEY,
    {
        expiresIn: '5m'
    });
}

exports.generateRefreshToken = (userId) => {
    return jwt.sign({
        userId: userId,
    },
        process.env.JWT_REFRESH_KEY,
    {
        expiresIn: '14d'
    });
}

exports.verifyRefreshToken = (refreshToken) => { 
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    } catch (err) {
        return err;
    }
}