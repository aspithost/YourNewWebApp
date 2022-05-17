const { autoLogin } = require('../helpers/autoLogin');

exports.autoLoginUser = (req, res, next) => {
    if (!req.user) return next();
    autoLogin(req, res);
    next();
}