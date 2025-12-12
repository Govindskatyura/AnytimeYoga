const Inquiry = require('../models/Inquiry')
const { sendInquiryAdminNotification, sendInquiryUserConfirmation } = require('../utils/emailService')

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, interest, goal, message } = req.body

        if (!firstName || !lastName || !email) {
            res.status(400).json({ message: 'Please provide required fields' })
            return
        }

        const inquiry = await Inquiry.create({
            firstName,
            lastName,
            email,
            phone,
            interest,
            goal,
            message
        })

        if (inquiry) {
            // Send Emails
            await sendInquiryAdminNotification(inquiry)
            await sendInquiryUserConfirmation(inquiry)

            res.status(201).json({
                message: 'Inquiry submitted successfully',
                inquiry
            })
        } else {
            res.status(400).json({ message: 'Invalid inquiry data' })
        }
    } catch (error) {
        console.error('Error creating inquiry:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    createInquiry
}
