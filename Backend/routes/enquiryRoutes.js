const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries } = require('../controllers/enquiryController');

// POST: Create enquiry
router.post('/', createEnquiry);

// GET: Fetch all enquiries
router.get('/', getEnquiries);

module.exports = router;