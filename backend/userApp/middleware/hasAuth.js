exports.hasAuth = (req, res, next) => {
    if (!req.user || req.user.rights < 2) {
        return res.status(403).json({ message: 'forbidden' });
    } 
    next();
}