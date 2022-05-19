const { setCookies, 
    sendCookies } = require('../helpers/autoLogin');

exports.autoLogin = (req, res, next) => {
    if (!req.user) return next();
    if (req.query.SSR) {
        sendCookies(req);
    } else {
        setCookies(req, res)
    }
    next();
}