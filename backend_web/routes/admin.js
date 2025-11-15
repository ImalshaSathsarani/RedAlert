const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllRequests, approveRequest, rejectRequest, getPendingRequests, pendingHospitalReport, getBloodDonors, getRegisteredHospitals, downloadDonorReport, inactivateDonor } = require('../controllers/admin/hospitalRequestController');

// Admin authentication middleware
//router.use(adminAuth);

// Hospital requests routes
router.get('/hospital-requests', getPendingRequests);
router.get('/blood-donors',getBloodDonors);
router.get('/donor-report/:donorId',downloadDonorReport);
router.get('/hospitals-registered',getRegisteredHospitals)
router.get('/hospital-report/:id', pendingHospitalReport);
router.put('/hospital-requests/:requestId/approve', approveRequest);
router.put('/hospital-requests/:requestId/reject', rejectRequest);
router.put('/delete-donor/:donorId', inactivateDonor);

module.exports = router;
