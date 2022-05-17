// Express
const express = require('express');
const router = express.Router();

// Controllers
const { deleteBlog } = require('../controllers/blogDeleteController');

const { getBlog, 
    getBlogs,
    getFeaturedBlogs,
    getSavedBlog,
    getSavedBlogs,
    getScheduledBlogs,
    getSearchedBlogs } = require('../controllers/blogGetController');

const { patchBlog } = require('../controllers/blogPatchController');

const { createBlog } = require('../controllers/blogPostController');

// Middleware
const { autoLoginUser,
    hasAuth } = require('../middleware/auth');

// Rate Limit
const rateLimit = require('express-rate-limit');
const searchLimiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 100,
    message: 'te vaak gozer'
});


// DELETE Controller
router.delete('/:id', 
    autoLoginUser, 
    hasAuth,
    deleteBlog);


// GET Controller
router.get('/', 
    getBlogs);

router.get('/featured', 
    getFeaturedBlogs);

router.get('/saved/:id',
    autoLoginUser, 
    hasAuth,
    getSavedBlog);

router.get('/saved', 
    autoLoginUser, 
    hasAuth,
    getSavedBlogs);    

router.get('/scheduled', 
    autoLoginUser, 
    hasAuth,
    getScheduledBlogs);

router.get('/search', 
    searchLimiter, 
    getSearchedBlogs);

router.get('/:id', 
    getBlog);


// PATCH Controller
router.patch('/:id', 
    autoLoginUser, 
    hasAuth,
    patchBlog);


// POST Controller
router.post('/new', 
    autoLoginUser, 
    hasAuth,
    createBlog);


// Export
module.exports = router;