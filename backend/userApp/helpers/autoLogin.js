const { setAccessCookie, 
    setRefreshCookie } = require('../helpers/cookies');

const { generateAccessToken,
    generateRefreshToken } = require('../helpers/tokens');

exports.autoLogin = (req, res) => {
    if (req.needsRefreshToken) {
        const refreshToken = generateRefreshToken(req.user._id);
        setRefreshCookie(refreshToken, res);  
    }
    const accessToken = generateAccessToken(req.user);
    setAccessCookie(accessToken, res);   
    res.accessToken = accessToken
}