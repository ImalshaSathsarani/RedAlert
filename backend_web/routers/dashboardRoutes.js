const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getRequestTrends,
  getBloodGroupDemand,
  getRequestSummary,
  getRecentRequests,
} = require("../controllers/dashboardController");

router.get("/trends", authMiddleware, getRequestTrends);
router.get("/blood-groups", authMiddleware, getBloodGroupDemand);
router.get("/summary", authMiddleware, getRequestSummary);
router.get("/recent", authMiddleware, getRecentRequests);

module.exports = router;
