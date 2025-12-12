const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    teacher: {
        type: String, // Storing Teacher ID string (e.g., TCH006) or ObjectId if we strictly use that. Let's use ID string for flexibility with seed data
        required: true,
        ref: 'Teacher' // This might not work perfectly if we mix ID types, but for now we essentially just store the ID
    },
    teacherName: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    yogaType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending', // Pending, Confirmed, Cancelled, Completed
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed']
    },
    paymentId: {
        type: String
    }
}, {
    timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
