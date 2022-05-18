const { cacheUser,
    checkUserCache } = require('../helpers/cache');

const { deleteCookies } = require('../helpers/cookies');

const { findUserById } = require('../helpers/databaseUser');

const { verifyRefreshToken } = require('../helpers/tokens');

exports.findUser = async (req, res, next) => {
    const tokenData = verifyRefreshToken(req.cookies.refreshCookie);
    if (!tokenData.userId) {
        return next();
    } else {
        // Check user cache
        const cachedUser = await checkUserCache(tokenData.userId);

        // If no cached user, check DB and then cache the user
        if (!cachedUser) {
            const dbUser = await findUserById(tokenData.userId);
            if (!dbUser) return res.status(404).json({ message: 'Not found' })
            if (dbUser.rights === 0) {
                return res.status(403).json({ message: 'You are banned' });
            }
            cacheUser(dbUser);
            req.user = dbUser;

        // Check if user wants to be logged out or is blacklisted
        } else if (cachedUser.loggedOut || cachedUser.blacklisted) {
            return deleteCookies(res);

        } else {
            req.user = cachedUser;
        }  
    }
    next();
}