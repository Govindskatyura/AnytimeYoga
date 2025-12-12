const Booking = require('../models/Booking')
const Teacher = require('../models/Teacher')
const { sendBookingNotification, sendBookingConfirmation } = require('../utils/emailService')

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (User)
const createBooking = async (req, res) => {
    try {
        const {
            teacherId,
            teacherName,
            date,
            time,
            yogaType,
            amount,
            paymentId
        } = req.body

        // Assuming middleware sets req.user
        const booking = await Booking.create({
            user: req.user._id,
            userName: req.user.name,
            userEmail: req.user.email,
            teacher: teacherId,
            teacherName,
            date,
            time,
            yogaType,
            amount,
            paymentId,
            status: 'Pending'
        })

        // Find teacher to get email
        const teacher = await Teacher.findOne({ id: teacherId })
        if (teacher) {
            await sendBookingNotification(teacher.email, booking)
        }

        res.status(201).json(booking)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Booking failed', error: error.message })
    }
}

// @desc    Get bookings for logged in user or teacher
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
    try {
        let bookings = []

        if (req.user) {
            // Check if Admin
            if (req.user.role === 'admin' || req.user.isAdmin) {
                bookings = await Booking.find({}).sort({ createdAt: -1 })
            } else {
                // User fetching their bookings
                bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 })
            }
        } else if (req.teacher) {
            // Teacher fetching their bookings
            // We stored teacher ID as string in Booking model 'teacher' field
            bookings = await Booking.find({ teacher: req.teacher.id }).sort({ createdAt: -1 })
        }

        res.json(bookings)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private (Teacher)
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body // 'Confirmed' or 'Cancelled'
        const booking = await Booking.findById(req.params.id)

        if (!booking) {
            res.status(404).json({ message: 'Booking not found' })
            return
        }

        // Verify it belongs to this teacher
        if (req.teacher && booking.teacher !== req.teacher.id) {
            res.status(401).json({ message: 'Not authorized' })
            return
        }

        booking.status = status
        await booking.save()

        if (status === 'Confirmed') {
            await sendBookingConfirmation(booking.userEmail, booking)
        }

        res.json(booking)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Update failed' })
    }
}

module.exports = {
    createBooking,
    getBookings,
    updateBookingStatus
}
