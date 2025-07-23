const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, uploadProfileImage } = require('../../controllers/donor/userController');
const { protect } = require('../../middleware/authMiddleware');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);
router.post('/me/upload-image', protect, upload.single('image'), uploadProfileImage);

module.exports = router;