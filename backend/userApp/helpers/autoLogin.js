const { setAccessCookie, 
    setRefreshCookie } = require('../helpers/cookies');

const { generateAccessToken,
    generateRefreshToken } = require('../helpers/tokens');

exports.autoLogin = (req, res) => {
    const refreshToken = generateRefreshToken(req.user._id);
    const accessToken = generateAccessToken(req.user);
    setRefreshCookie(refreshToken, res);  
    setAccessCookie(accessToken, res);   
    req.accessToken = accessToken;
}