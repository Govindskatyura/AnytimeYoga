const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret && process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET is required in production')
    }

    const secretToUse = jwtSecret || 'dev_jwt_secret_change_me'

    if (!jwtSecret) {
        console.warn('Warning: JWT_SECRET is not set. Using a development fallback secret.')
    }

    return jwt.sign({ id }, secretToUse, {
        expiresIn: '30d',
    })
}

module.exports = generateToken
