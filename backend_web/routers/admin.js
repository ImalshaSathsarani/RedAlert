const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllRequests, approveRequest, rejectRequest } = require('../controllers/admin/hospitalRequestController');

// Admin authentication middleware
router.use(adminAuth);

// Hospital requests routes
router.get('/hospital-requests', getAllRequests);
router.put('/hospital-requests/:requestId/approve', approveRequest);
router.put('/hospital-requests/:requestId/reject', rejectRequest);

module.exports = router;
