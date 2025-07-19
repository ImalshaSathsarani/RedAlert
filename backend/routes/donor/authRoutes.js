const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, changePassword } = require('../../controllers/donor/authController');
const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', protect, changePassword);

module.exports = router;