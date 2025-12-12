const nodemailer = require('nodemailer')

// Configure transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_USER || 'ethereal_user',
        pass: process.env.SMTP_PASS || 'ethereal_pass'
    }
})

const sendBookingNotification = async (teacherEmail, bookingDetails) => {
    console.log(`[EMAIL SIMULATION] Sending notification to TEACHER ${teacherEmail}`)
    console.log(`Subject: New Booking Request: ${bookingDetails.yogaType} with ${bookingDetails.userName}`)
    console.log(`Body: You have a new booking request for ${new Date(bookingDetails.date).toDateString()} at ${bookingDetails.time}. Please login to your dashboard to accept or reject.`)
}

const sendBookingConfirmation = async (userEmail, bookingDetails) => {
    console.log(`[EMAIL SIMULATION] Sending confirmation to USER ${userEmail}`)
    console.log(`Subject: Booking Confirmed!`)
    console.log(`Body: Your session for ${bookingDetails.yogaType} on ${new Date(bookingDetails.date).toDateString()} at ${bookingDetails.time} has been confirmed by the instructor.`)
}

const sendInquiryAdminNotification = async (inquiry) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@anytimeyoga.com'
    console.log(`[EMAIL SIMULATION] Sending Inquiry Notification to ADMIN ${adminEmail}`)
    const subject = `New Free Trial Inquiry: ${inquiry.firstName} ${inquiry.lastName}`
    const text = `
        You have received a new inquiry for Free Trial.
        
        Name: ${inquiry.firstName} ${inquiry.lastName}
        Email: ${inquiry.email}
        Phone: ${inquiry.phone}
        Interest: ${inquiry.interest}
        Goal: ${inquiry.goal}
        
        Please contact them soon.
    `
    console.log(`Subject: ${subject}`)
    console.log(`Body: ${text}`)

    try {
        if (process.env.SMTP_HOST) {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || '"AnyTimeYoga" <no-reply@anytimeyoga.com>',
                to: adminEmail,
                subject: subject,
                text: text
            })
            console.log('Admin notification email sent (Real).')
        }
    } catch (error) {
        console.error('Error sending admin email:', error)
    }
}

const sendInquiryUserConfirmation = async (inquiry) => {
    console.log(`[EMAIL SIMULATION] Sending Inquiry Confirmation to USER ${inquiry.email}`)
    const subject = `We received your inquiry!`
    const text = `
        Hi ${inquiry.firstName},
        
        Thank you for your interest in AnyTimeYoga! 
        We have received your request for a Free Trial session.
        
        Our team will review your wellness goals (` + inquiry.goal + `) and get back to you within 24 hours to schedule your consultation.
        
        Namaste,
        The AnyTimeYoga Team
    `
    console.log(`Subject: ${subject}`)
    console.log(`Body: ${text}`)

    try {
        if (process.env.SMTP_HOST) {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || '"AnyTimeYoga" <no-reply@anytimeyoga.com>',
                to: inquiry.email,
                subject: subject,
                text: text
            })
            console.log('User confirmation email sent (Real).')
        }
    } catch (error) {
        console.error('Error sending user email:', error)
    }
}

module.exports = {
    sendBookingNotification,
    sendBookingConfirmation,
    sendInquiryAdminNotification,
    sendInquiryUserConfirmation
}
