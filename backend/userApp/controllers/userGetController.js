const { cacheLoggedOutUser,
    cacheUserLimited,
    checkUserCacheLimited } = require('../helpers/cache');

const { deleteCookies } = require('../helpers/cookies');

const { findUserById } = require('../helpers/databaseUser.js');

const { getPasswordHash } = require('../helpers/databasePasswordHash');

exports.getUser = async (req, res, next) => {
    try {
        return res.status(200).json(
            req.query.SSR ? 
            { 
                message: 'logged in successfully',
                accessToken: req.accessToken,
                refreshToken: req.refreshToken
            } :
            { 
                message: 'logged in successfully'
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
            return res.status(401).json({ message: 'Not logged in'});
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
            if (!user) return res.status(404).json();
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
            return res.status(403).json({ message: 'not logged in' });
        } else {
            deleteCookies(res);
            return res.status(201).json({ message: 'logged out' });
        }
    } catch (err) {
      next (err);
    }
}

exports.logoutUserAllDevices = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: 'not logged in' });
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