const express = require("express");
const router = express.Router();
const {
  createBloodRequest,
  getAllRequests,
} = require("../controllers/requestcontroller");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure hospital is logged in
const { getHospitalRequests } = require("../controllers/requestcontroller");

router.post("/request-blood", authMiddleware, createBloodRequest);
router.get("/community-posts", getAllRequests); // For community page
router.get("/my-requests", authMiddleware, getHospitalRequests);

module.exports = router;
