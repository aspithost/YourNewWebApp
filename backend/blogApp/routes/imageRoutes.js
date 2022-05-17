const express = require('express');
const router = express.Router();

// Middleware
const { autoLoginUser, hasAuth } = require('../middleware/auth');
const { preUpload } = require('../middleware/imageMiddleware');

// Controllers
const { formatImage } = require('../controllers/imageController');


// POST Routes
router.post('/upload', 
    autoLoginUser, 
    hasAuth, 
    preUpload, 
    formatImage);

    
// Export Router
module.exports = router;