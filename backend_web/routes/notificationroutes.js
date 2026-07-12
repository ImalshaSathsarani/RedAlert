const express = require("express");
const router = express.Router();
const multer = require("multer");
const { sendNotifications, getNotifications, getSentNotifications } = require("../controllers/notificationController");

router.post("/send", sendNotifications);
router.get("/hospital/:id", getNotifications);
router.get("/hospital/sentbox/:id", getSentNotifications);

module.exports = router;