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
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123')

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
