// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithGPT } = require('../controllers/chatController');

router.post('/chat', chatWithGPT);

module.exports = router;
