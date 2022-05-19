// Express
const express = require('express');
const router = express.Router();

// Middleware
const { autoLogin } = require('../middleware/autoLoginUser');
const { findUser } = require('../middleware/findUser');
const { hasAuth } = require('../middleware/hasAuth');

// Controllers
const { deleteUser } = require('../controllers/userDeleteController');

const { getUser, 
    getUserFirstRender,
    checkPasswordHash, 
    findBlogAuthor, 
    logoutUser,
    logoutUserAllDevices } = require('../controllers/userGetController');

const { activateUser,
    patchAvatar, 
    patchPassword,
    patchPasswordWithHash, 
    patchRights, 
    patchUsername, } = require('../controllers/userPatchController');

const { createUser, 
    loginUser, 
    newAuthHash, 
    newPasswordHash } = require('../controllers/userPostController');

// Limiters
const rateLimit = require('express-rate-limit');

const userLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500,
    message: 'te vaak gozer'
});

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 500,
    message: 'te vaak gozer'
})


// DELETE Controller
router.delete('/user/', 
    findUser, 
    deleteUser);


// GET Controller
router.get('/loginUser', 
    findUser, 
    autoLogin, 
    getUser);

router.get('/user/checkPasswordHash/:passwordHash', 
    userLimiter, 
    checkPasswordHash);

router.get('/findBlogAuthor', 
    findBlogAuthor) 

router.get('/logout', 
    loginLimiter, 
    findUser, 
    logoutUser);

router.get('/logoutall',
    loginLimiter,
    findUser,
    logoutUserAllDevices);


// PATCH Controller
router.patch('/user/avatar', 
    findUser, 
    hasAuth, 
    patchAvatar);

router.patch('/user/password', 
    loginLimiter, 
    findUser, 
    patchPassword);

router.patch('/user/passwordWithHash/:passwordHash', 
    userLimiter, 
    patchPasswordWithHash);

router.patch('/user/rights', 
    findUser, 
    hasAuth,
    patchRights);

router.patch('/user/username', 
    loginLimiter, 
    findUser, 
    patchUsername);

router.patch('/verify/:authHash', 
    userLimiter, 
    activateUser);


// POST Controller
router.post('/createuser', 
    userLimiter, 
    findUser, 
    autoLogin, 
    createUser);

router.post('/login', 
    loginLimiter, 
    findUser, 
    autoLogin, 
    loginUser);

router.post('/user/newAuthHash', 
    userLimiter, 
    newAuthHash);

router.post('/user/newPasswordHash', 
    userLimiter,
    newPasswordHash);


// Export
module.exports = router;