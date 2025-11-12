const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../controllers/hospitalcontroller");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/update-profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
