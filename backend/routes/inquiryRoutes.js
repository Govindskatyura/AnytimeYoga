const express = require('express')
const router = express.Router()
const { createInquiry } = require('../controllers/inquiryController')

// @desc    Create new inquiry
// @route   POST /api/inquiries
router.post('/', createInquiry)

module.exports = router
