const User = require('../models/User')

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@anytimeyoga.com'
        const adminExists = await User.findOne({ email: adminEmail })

        if (!adminExists) {
            console.log('Admin user not found. Creating...')
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: 'admin123', // Will be hashed by pre-save hook
                phone: '0000000000',
                isAdmin: true,
                role: 'admin'
            })
            console.log('Admin user created successfully.')
        } else {
            // Optional: Ensure role is admin if it exists
            if (adminExists.role !== 'admin') {
                adminExists.role = 'admin'
                adminExists.isAdmin = true
                await adminExists.save()
                console.log('Existing Admin user updated with admin role.')
            }
        }
    } catch (error) {
        console.error('Error seeding admin:', error)
    }
}

module.exports = seedAdmin
