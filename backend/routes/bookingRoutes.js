const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController')

router.route('/')
    .post(protect, createBooking)
    .get(protect, getBookings)

router.route('/:id')
    .put(protect, updateBookingStatus)

module.exports = router
