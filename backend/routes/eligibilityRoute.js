const express = require('express');
const router = express.Router();
const { submitEligibility } = require('../controllers/donor/eligibilityController');

router.post('/submit', submitEligibility);

module.exports = router;
