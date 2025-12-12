const nodemailer = require('nodemailer')

// Configure transporter
// Note: In production, use environment variables for credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ethereal_user', // Replace with real env vars
        pass: 'ethereal_pass'
    }
})

const sendBookingNotification = async (teacherEmail, bookingDetails) => {
    console.log(`[EMAIL SIMULATION] Sending notification to TEACHER ${teacherEmail}`)
    console.log(`Subject: New Booking Request: ${bookingDetails.yogaType} with ${bookingDetails.userName}`)
    console.log(`Body: You have a new booking request for ${new Date(bookingDetails.date).toDateString()} at ${bookingDetails.time}. Please login to your dashboard to accept or reject.`)

    // In real app:
    // await transporter.sendMail({ ... })
}

const sendBookingConfirmation = async (userEmail, bookingDetails) => {
    console.log(`[EMAIL SIMULATION] Sending confirmation to USER ${userEmail}`)
    console.log(`Subject: Booking Confirmed!`)
    console.log(`Body: Your session for ${bookingDetails.yogaType} on ${new Date(bookingDetails.date).toDateString()} at ${bookingDetails.time} has been confirmed by the instructor.`)
}

module.exports = {
    sendBookingNotification,
    sendBookingConfirmation
}
