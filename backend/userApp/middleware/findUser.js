const { cacheUser,
    checkUserCache } = require('../helpers/cache');

const { deleteCookies } = require('../helpers/cookies');

const { findUserById } = require('../helpers/databaseUser');

const { verifyRefreshToken } = require('../helpers/tokens');

exports.findUser = async (req, res, next) => {
    const tokenData = verifyRefreshToken(req.cookies.refreshCookie);
    if (!tokenData) {
        return next();
    } else {
        // ALS REFRESH TOKEN OUDER IS DAN 1 DAG, NIEUWE GENEREREN
        req.needsRefreshToken = tokenData.exp - Date.now() / 1000 < 1123200 ? true : false

        // CHECK USER CACHE
        const cachedUser = await checkUserCache(tokenData.userId);

        // IF NO USER IN CACHE, CHECK DB & CACHE USER
        // let dbUser
        if (!cachedUser) {
            const dbUser = await findUserById(tokenData.userId);
            if (!dbUser) return res.status(404).json({ message: 'Not found' })
            if (dbUser.rights === 0) {
                return res.status(403).json({ message: 'You are banned' });
            }
            cacheUser(dbUser);
            req.user = dbUser;

        // CHECK IF USER WANTS TO BE LOGGED OUT OR IS BLACKLISTED
        } else if (cachedUser.loggedOut || cachedUser.blacklisted) {
            return deleteCookies(res);

        // EINDE
        } else {
            req.user = cachedUser;
        }  
    }
    next();
}