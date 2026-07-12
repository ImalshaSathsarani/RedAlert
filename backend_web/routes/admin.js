const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllRequests, approveRequest, rejectRequest, getPendingRequests, pendingHospitalReport, getBloodDonors, getRegisteredHospitals, downloadDonorReport, inactivateDonor, downloadHospitalHistoryReport,inactivateHospital, getDashboardStats, getMonthlyStats, getMonthlyRegistrations, getUserDistribution, registerAdmin, loginAdmin } = require('../controllers/admin/hospitalRequestController');

// Admin authentication middleware
//

// Hospital requests routes
router.post('/register',registerAdmin);
router.post('/login',loginAdmin);

router.use(adminAuth);

router.get('/hospital-requests', getPendingRequests);
router.get('/blood-donors',getBloodDonors);
router.get('/dashboard-stats',getDashboardStats);
router.get('/monthly-registrations',getMonthlyRegistrations);
router.get('/user-distribution', getUserDistribution)
router.get('/donor-report/:donorId',downloadDonorReport);
router.get('/hospitals-registered',getRegisteredHospitals)
router.get('/hospital-report/:id', pendingHospitalReport);
router.put('/hospital-requests/:requestId/approve', approveRequest);
router.put('/hospital-requests/:requestId/reject', rejectRequest);
router.put('/delete-donor/:donorId', inactivateDonor);
router.get('/hospital-history/:id', downloadHospitalHistoryReport);
router.put('/delete-hospital/:hospitalId', inactivateHospital);

module.exports = router;
