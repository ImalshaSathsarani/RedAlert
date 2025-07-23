// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithGPT } = require('../controllers/chatController');
const { protect} = require("../middleware/authMiddleware")

router.post('/chat', protect, chatWithGPT);

module.exports = router;
