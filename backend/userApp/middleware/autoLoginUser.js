const { setCookies, 
    sendCookies } = require('../helpers/autoLogin');

exports.autoLogin = (req, res, next) => {
    if (!req.user) return next();
    setCookies(req, res)
    next();
}

exports.autoLoginSSR = (req, res, next) => {
    if (!req.user) return next();
    sendCookies(req);
    next();
}