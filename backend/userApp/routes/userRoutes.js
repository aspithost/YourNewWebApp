// Express
const express = require('express');
const router = express.Router();

// Middleware
const { loginMiddleware } = require('../middleware/loginMiddleware');
const { findUser } = require('../middleware/findUser');
const { hasAuth } = require('../middleware/hasAuth');

// Controllers
const { deleteUser } = require('../controllers/userDeleteController');

const { checkPasswordHash, 
    findBlogAuthor, 
    logoutUser,
    logoutUserAllDevices } = require('../controllers/userGetController');

const { activateUser,
    patchAvatar, 
    patchPassword,
    patchPasswordWithHash, 
    patchRights, 
    patchUsername, } = require('../controllers/userPatchController');

const { autoLoginUser, 
    createUser, 
    loginUser, 
    newAuthHash, 
    newPasswordHash } = require('../controllers/userPostController');

// Limiters
const rateLimit = require('express-rate-limit');

const userLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500,
    message: 'timed out'
});

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 500,
    message: 'timed out'
})


// DELETE Controller
router.delete('/', 
    findUser, 
    deleteUser);


// GET Controller
router.get('/passwordReset/:passwordHash', 
    userLimiter, 
    checkPasswordHash);

router.get('/blogAuthor', 
    findBlogAuthor) 

router.get('/logout', 
    loginLimiter, 
    findUser, 
    logoutUser);

router.get('/logoutAll',
    loginLimiter,
    findUser,
    logoutUserAllDevices);


// PATCH Controller
router.patch('/avatar', 
    findUser, 
    hasAuth, 
    patchAvatar);

router.patch('/password', 
    loginLimiter, 
    findUser, 
    patchPassword);

router.patch('/passwordReset/:passwordHash', 
    userLimiter, 
    patchPasswordWithHash);

router.patch('/rights', 
    findUser, 
    hasAuth,
    patchRights);

router.patch('/username', 
    loginLimiter, 
    findUser, 
    patchUsername);

router.patch('/activation/:authHash', 
    userLimiter, 
    activateUser);


// POST Controller
router.post('/', 
    userLimiter, 
    findUser, 
    loginMiddleware, 
    createUser);

router.post('/autoLogin', 
    findUser, 
    loginMiddleware, 
    autoLoginUser);

router.post('/login', 
    loginLimiter, 
    findUser, 
    loginMiddleware, 
    loginUser);

router.post('/verificationEmail', 
    userLimiter, 
    newAuthHash);

router.post('/passwordReset', 
    userLimiter,
    newPasswordHash);


// Export
module.exports = router;