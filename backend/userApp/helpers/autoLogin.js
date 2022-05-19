const { setAccessCookie, 
    setRefreshCookie } = require('../helpers/cookies');

const { generateTokens } = require('../helpers/tokens');

exports.setCookies = (req, res) => {
    const [ accessToken, refreshToken ] = generateTokens(req);
    setAccessCookie(accessToken, res);   
    setRefreshCookie(refreshToken, res);  
}

exports.sendCookies = (req, res) => {
    const [ accessToken, refreshToken ] = generateTokens(req);
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;
}