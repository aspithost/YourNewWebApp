const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
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

const generateRefreshToken = (userId) => {
    return jwt.sign({
        userId: userId,
    },
        process.env.JWT_REFRESH_KEY,
    {
        expiresIn: '14d'
    });
}

exports.generateTokens = (req) => {
    const accessToken = generateAccessToken(req.user);
    const refreshToken = generateRefreshToken(req.user._id);
    return [ accessToken, refreshToken ]
}

exports.verifyRefreshToken = (refreshToken) => { 
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    } catch (err) {
        return err;
    }
}