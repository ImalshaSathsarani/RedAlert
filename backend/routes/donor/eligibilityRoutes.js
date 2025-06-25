const express = require('express');
const router = express.Router();
const { createEligibilityCheck, getEligibilityCheck } = require('../../controllers/donor/eligibilityController');

// Create new eligibility check
router.post('/', createEligibilityCheck);

// Get eligibility check by ID
router.get('/:id', getEligibilityCheck);

module.exports = router;
