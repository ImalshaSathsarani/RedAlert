const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getRequestTrends,
  getBloodGroupDemand,
  getRequestSummary,
  getRecentRequests,
  getMatchedDonors,
  getMatchedDonorsCount,
} = require("../controllers/dashboardController");

router.get("/trends", authMiddleware, getRequestTrends);
router.get("/blood-groups", authMiddleware, getBloodGroupDemand);
router.get("/summary", authMiddleware, getRequestSummary);
router.get("/recent", authMiddleware, getRecentRequests);
router.get("/matched-donors", authMiddleware, getMatchedDonors);
router.get("/matched-donors-count", authMiddleware, getMatchedDonorsCount);

module.exports = router;
