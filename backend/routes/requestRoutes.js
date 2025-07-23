const express = require('express');
const { getRequestDetails } = require('../controllers/requestController');
const router = express.Router();

router.get("/:id", getRequestDetails);

module.exports = router;