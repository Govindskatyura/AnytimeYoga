const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const teacherRoutes = require('./routes/teacherRoutes')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bookingRoutes = require('./routes/bookingRoutes')
const inquiryRoutes = require('./routes/inquiryRoutes')

const seedAdmin = require('./utils/seeder')

dotenv.config()

connectDB()
// Seed admin only in non-production environments (prevents creating default admin in production)
if (process.env.NODE_ENV !== 'production') {
    seedAdmin()
}

const app = express()

app.use(cors())
// Security middlewares
app.use(helmet())

// Rate limiter (configurable via env)
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS) : 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 100, // limit each IP
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(limiter)

// CORS: allow explicit origins via `CORS_ORIGIN` env (comma-separated), fallback to permissive for dev
const corsOptions = {}
if (process.env.CORS_ORIGIN) {
    corsOptions.origin = process.env.CORS_ORIGIN.split(',')
}
app.use(cors(corsOptions))

app.use('/api/teachers', teacherRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/api/inquiries', inquiryRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
})
