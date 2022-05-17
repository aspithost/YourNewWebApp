const express = require('express');
const router = express.Router();

// Middleware
const { findUser } = require('../middleware/findUser');
const { hasAuth } = require('../middleware/hasAuth');
const { preUpload } = require('../middleware/imageMiddleware');

// Controllers
const { formatAvatar } = require('../controllers/imageController');


// POST Routes
router.post('/upload', 
    findUser, 
    hasAuth, 
    preUpload, 
    formatAvatar);

    
// Export Router
module.exports = router;