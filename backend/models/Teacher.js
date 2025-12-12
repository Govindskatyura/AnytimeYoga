const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const teacherSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    specialization: [String],
    totalSessions: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    image: { type: String },
    title: { type: String },
    bio: { type: String }, // For short bio in card
    about: {
        passion: { type: String },
        approach: { type: String }
    },
    keySkills: [String],
    expertise: [String], // For detailed expertise list
    education: [String],
    experience: [String],
    password: { type: String, required: true }
}, {
    timestamps: true
})

// Match user entered password to hashed password in database
teacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher
