const jwt = require("jsonwebtoken")

exports.verifyAccessToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    } catch (error) {
        return ;
    }
}