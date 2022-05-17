const { verifyAccessToken } = require('../helpers/tokens');

exports.autoLoginUser = async (req, res, next) => {
    // Check for Cookie
    const accessToken = req.cookies.accessCookie;
    if (!accessToken) {
        throw new Error('no auth')
    } else {
        // Verify AccessToken
        const user = verifyAccessToken(accessToken);
        if (!user) throw new Error('no auth')
        req.user = user;
        next();
    }
}

exports.hasAuth = (req, res , next) => {
    if (!req.user || req.user.rights < 2) {
        throw new Error('no auth'); 
    } else {
        next();
    }
}