const { cacheLoggedOutUser,
    cacheUserLimited,
    checkUserCacheLimited } = require('../helpers/cache');

const { deleteCookies } = require('../helpers/cookies');

const { findUserById } = require('../helpers/databaseUser.js');

const { getPasswordHash } = require('../helpers/databasePasswordHash');

exports.autoLogin = async (req, res, next) => {
    try {
        return res.status(200).json({ 
            message: 'autologin afgerond',
            accessToken: res.accessToken
        });
    } catch (err) {
        next (err);
    }
}

exports.checkPasswordHash = async (req, res, next) => {
    try {
        const passwordHash = await getPasswordHash(req.params.passwordHash);
        const user = await findUserById(passwordHash.user._id);
        if (!user) {
            return res.status(401).json({ message: 'Nope'});
        } else {
            return res.status(200).json({
                message: 'You can now set a new password',
                user
            });
        }
    } catch (err) {
      next (err);
    }
}

exports.findBlogAuthor = async (req, res, next) => {
    try {
        const cachedUser = await checkUserCacheLimited(req.query.userId);
        if (!cachedUser) {
            const user = await findUserById(req.query.userId);
            const userLimited = {
                'avatar': user.avatar,
                'username': user.username
            }
            cacheUserLimited(user._id, userLimited);
            return res.status(200).json(userLimited);
        } else {
            return res.status(200).json(cachedUser);
        }
    } catch (err) {
        next (err)
    }
  }
  
exports.logoutUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: 'niet ingelogd vriend' });
        } else {
            deleteCookies(res);
            return res.status(201).json({
                message: 'uitgelogd lullo'
            });
        }
    } catch (err) {
      next (err);
    }
}

exports.logoutUserAllDevices = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(403).json({message: 'niet ingelogd vriend'});
        } else {
            cacheLoggedOutUser(user);
            return res.status(201).json({ 
                message: 'logged out on all devices'
            });
        }       
    } catch (err) {
        next (err);
    }
}