const { verifyAccessToken } = require('../helpers/tokens');

exports.autoLoginUser = (req, res, next) => {
    // Check for Cookie
    try {
        const accessToken = req.cookies.accessCookie;
        if (!accessToken) throw new Error('no access token');

        // Verify AccessToken
        const user = verifyAccessToken(accessToken);
        if (!user) throw new Error('no user');

        // Set user to request 
        req.user = user;
        next();     
    } catch (err) {
        err.statusCode = 401
    }

}

exports.hasAuth = (req, res , next) => {
    try {
        if (!req.user || req.user.rights < 2) throw new Error('forbidden');
        next();
    } catch (err) {
        err.statusCode = 403
    }
}