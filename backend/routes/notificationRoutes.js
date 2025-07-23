const express = require('express');
const { getNotifications, acceptOrDeclineRequests, savePushToken, getUnreadNotificaions } = require('../controllers/notificationController');
const router = express.Router();
router.get("/user/:userId", getNotifications);
router.post("/respond/:id",acceptOrDeclineRequests);
router.post('/save-push-token',savePushToken);
router.get("//unread-count/:userId", getUnreadNotificaions)
module.exports = router;