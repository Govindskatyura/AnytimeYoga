const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Teacher = require('../models/Teacher')

const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const jwtSecret = process.env.JWT_SECRET

            if (!jwtSecret && process.env.NODE_ENV === 'production') {
                console.error('JWT_SECRET not set in production')
                res.status(500).json({ message: 'Server misconfiguration' })
                return
            }

            const secretToUse = jwtSecret || 'dev_jwt_secret_change_me'
            const decoded = jwt.verify(token, secretToUse)

            // Try to find user or teacher
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user) {
                req.teacher = await Teacher.findById(decoded.id).select('-password')
            }

            if (!req.user && !req.teacher) {
                res.status(401)
                throw new Error('Not authorized, token failed')
            }

            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: 'Not authorized, token failed' })
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }
}

module.exports = { protect }
