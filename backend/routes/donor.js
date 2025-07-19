const express = require('express');
const router = express.Router();
const { userProfile, updateUserProfile } = require('../controllers/donor/userController');
const auth = require('../middleware/auth');

// Get user profile
router.get('/me', auth, userProfile);

// Update user profile
router.put('/me', auth, updateUserProfile);

module.exports = router;
