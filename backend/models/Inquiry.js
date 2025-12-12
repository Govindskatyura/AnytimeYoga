const mongoose = require('mongoose')

const inquirySchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    interest: { type: String },
    goal: { type: String },
    message: { type: String },
    status: { type: String, default: 'New' }, // New, Contacted, Converted, Closed
    adminNotes: { type: String }
}, {
    timestamps: true
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)

module.exports = Inquiry
