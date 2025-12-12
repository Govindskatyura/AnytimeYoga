const express = require('express')
const router = express.Router()
const Teacher = require('../models/Teacher')
const { registerTeacher, authTeacher, updateTeacherProfile, uploadTeacherImage } = require('../controllers/teacherController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.post('/register', registerTeacher)
router.post('/login', authTeacher)
router.put('/profile', protect, updateTeacherProfile)
router.post('/upload', protect, upload.single('image'), uploadTeacherImage)


// @desc    Fetch all teachers
// @route   GET /api/teachers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find({})
        res.json(teachers)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
})

// @desc    Fetch single teacher
// @route   GET /api/teachers/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id })

        if (teacher) {
            res.json(teacher)
        } else {
            res.status(404).json({ message: 'Teacher not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router
