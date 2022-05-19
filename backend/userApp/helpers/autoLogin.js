const { setAccessCookie, 
    setRefreshCookie } = require('./cookies');

const { generateTokens } = require('./tokens');

exports.setCookies = (req, res) => {
    const [ accessToken, refreshToken ] = generateTokens(req);
    setAccessCookie(accessToken, res);   
    setRefreshCookie(refreshToken, res);
}

exports.sendCookies = (req) => {
    const [ accessToken, refreshToken ] = generateTokens(req);
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;
}