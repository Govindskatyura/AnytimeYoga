const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const teacherRoutes = require('./routes/teacherRoutes')
const userRoutes = require('./routes/userRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/teachers', teacherRoutes)
app.use('/uploads', express.static('uploads'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
})
