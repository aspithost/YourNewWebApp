const { setCookies, 
    sendCookies } = require('../helpers/autoLogin');

exports.loginMiddleware = (req, res, next) => {
    if (!req.user) return next();
    if (req.query.SSR) {
        sendCookies(req);
    } else {
        setCookies(req, res)
    }
    next();
}