const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createBloodRequest,
  getAllRequests,
} = require("../controllers/requestcontroller");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure hospital is logged in
const { getHospitalRequests } = require("../controllers/requestcontroller");
const upload = multer({ dest: "uploads/" });
const requestController = require("../controllers/requestcontroller");

router.post(
  "/request-blood",
  authMiddleware,
  upload.fields([{ name: "doctorRequestFile", maxCount: 1 }]),
  createBloodRequest
);
router.get("/community-posts", getAllRequests); // For community page
router.get("/my-requests", authMiddleware, getHospitalRequests);
router.get(
  "/hospital-requests",
  authMiddleware,
  requestController.getHospitalRequests
);

router.get("/blood-request/pending", requestController.getPendingBloodRequests)

router.get("/blood-requests/:id", requestController.getBloodRequestDetails)

router.get("/donors/find/:requestId",requestController.findMatchingDonors)


router.put("/complete/:requestId",authMiddleware, requestController.completeRequest);


router.put("/cancel/:requestId",authMiddleware, requestController.cancelRequest);

module.exports = router;