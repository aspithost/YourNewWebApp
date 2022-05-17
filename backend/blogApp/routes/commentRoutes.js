// Express
const express = require('express');
const router = express.Router();

// Controllers
const { deleteComment } = require('../controllers/commentDeleteController');

const { getComments } = require('../controllers/commentGetController');

const { patchComment } = require('../controllers/commentPatchController');

const { createComment,
    createReply } = require('../controllers/commentPostController');

// Middleware
const { autoLoginUser, 
    hasAuth } = require('../middleware/auth');

// Rate Limiter
const rateLimit = require('express-rate-limit');
const commentLimiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 5,
    message: 'te vaak gozer'
});


// DELETE Controller
router.delete('/:commentId/:blogId', 
    autoLoginUser, 
    hasAuth,
    deleteComment);


// GET Controller
router.get('/:blogId', 
    getComments);


// POST  Controller
router.post('/', 
    commentLimiter, 
    autoLoginUser, 
    createComment)


router.post('/reply/', 
    commentLimiter, 
    autoLoginUser, 
    createReply);


// PATCH Controller
router.patch('/:commentId', 
    commentLimiter, 
    autoLoginUser, 
    patchComment);


// Export
module.exports = router;