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
                password: 'admin123',
                phone: '0000000000',
                isAdmin: true,
                role: 'admin'
            })
            console.log('Admin user created successfully.')
        }

        // Seed Demo User
        const userEmail = 'user@example.com'
        const userExists = await User.findOne({ email: userEmail })
        if (!userExists) {
            console.log('Demo user not found. Creating...')
            await User.create({
                name: 'Demo User',
                email: userEmail,
                password: 'user123',
                phone: '1234567890',
                role: 'user'
            })
            console.log('Demo user created successfully.')
        }

        // Seed Demo Teacher (using the one from api.js mock)
        const teacherEmail = 'teacher@anytimeyoga.com'
        // For teacher we need to check Teacher model, require it first
        const Teacher = require('../models/Teacher')
        const teacherExists = await Teacher.findOne({ email: teacherEmail })
        if (!teacherExists) {
            console.log('Demo teacher not found. Creating...')
            await Teacher.create({
                id: 'TCH001',
                name: 'Emma Wilson',
                email: teacherEmail,
                password: 'teacher123',
                phone: '9876543210',
                specialization: ['Vinyasa'],
                bio: 'Experienced Vinyasa instructor.',
                title: 'Vinyasa Expert',
                keySkills: ['Vinyasa', 'Flow'],
                expertise: ['Flexibility'],
                education: ['RYT-200'],
                experience: ['3 years']
            })
            console.log('Demo teacher created successfully.')
        }
    } catch (error) {
        console.error('Error seeding admin:', error)
    }
}

module.exports = seedAdmin
