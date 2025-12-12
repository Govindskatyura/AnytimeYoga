const Teacher = require('../models/Teacher')
const generateToken = require('../utils/generateToken')

// @desc    Register a new teacher
// @route   POST /api/teachers/register
// @access  Public
const registerTeacher = async (req, res) => {
    const { id, name, email, password, phone, specialization, bio, title, keySkills, expertise, education, experience } = req.body

    const teacherExists = await Teacher.findOne({ email })

    if (teacherExists) {
        res.status(400).json({ message: 'Teacher already exists' })
        return
    }

    // Auto-generate ID if not provided? For now assume it's passed or we generate simple one
    const teacherId = id || `TCH${Date.now()}`

    const teacher = await Teacher.create({
        id: teacherId,
        name,
        email,
        password,
        phone,
        specialization: specialization || [],
        bio,
        title,
        keySkills: keySkills || [],
        expertise: expertise || [],
        education: education || [],
        experience: experience || []
    })

    if (teacher) {
        res.status(201).json({
            _id: teacher._id,
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            token: generateToken(teacher._id),
        })
    } else {
        res.status(400).json({ message: 'Invalid teacher data' })
    }
}

// @desc    Auth teacher & get token
// @route   POST /api/teachers/login
// @access  Public
const authTeacher = async (req, res) => {
    const { email, password } = req.body

    const teacher = await Teacher.findOne({ email })

    if (teacher && (await teacher.matchPassword(password))) {
        res.json({
            _id: teacher._id,
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            token: generateToken(teacher._id),
        })
    } else {
        res.status(401).json({ message: 'Invalid email or password' })
    }
}

// @desc    Update teacher profile
// @route   PUT /api/teachers/profile
// @access  Private
const updateTeacherProfile = async (req, res) => {
    const teacher = await Teacher.findById(req.teacher._id)

    if (teacher) {
        teacher.name = req.body.name || teacher.name
        teacher.phone = req.body.phone || teacher.phone
        teacher.bio = req.body.bio || teacher.bio
        teacher.specialization = req.body.specialization || teacher.specialization
        teacher.title = req.body.title || teacher.title
        teacher.keySkills = req.body.keySkills || teacher.keySkills
        teacher.expertise = req.body.expertise || teacher.expertise
        teacher.education = req.body.education || teacher.education
        teacher.experience = req.body.experience || teacher.experience

        if (req.body.about) {
            teacher.about = {
                passion: req.body.about.passion || teacher.about.passion,
                approach: req.body.about.approach || teacher.about.approach
            }
        }

        if (req.body.password) {
            teacher.password = req.body.password
        }

        const updatedTeacher = await teacher.save()

        res.json({
            _id: updatedTeacher._id,
            id: updatedTeacher.id,
            name: updatedTeacher.name,
            email: updatedTeacher.email,
            phone: updatedTeacher.phone,
            image: updatedTeacher.image,
            bio: updatedTeacher.bio,
            specialization: updatedTeacher.specialization,
            title: updatedTeacher.title,
            about: updatedTeacher.about,
            keySkills: updatedTeacher.keySkills,
            expertise: updatedTeacher.expertise,
            education: updatedTeacher.education,
            experience: updatedTeacher.experience,
            token: generateToken(updatedTeacher._id),
        })
    } else {
        res.status(404).json({ message: 'Teacher not found' })
    }
}

// @desc    Upload teacher profile image
// @route   POST /api/teachers/upload
// @access  Private
const uploadTeacherImage = async (req, res) => {
    const teacher = await Teacher.findById(req.teacher._id)

    if (teacher) {
        teacher.image = `/${req.file.path.replace(/\\/g, "/")}`
        const updatedTeacher = await teacher.save()
        res.json({
            message: 'Image uploaded',
            image: updatedTeacher.image
        })
    } else {
        res.status(404).json({ message: 'Teacher not found' })
    }
}

module.exports = {
    registerTeacher,
    authTeacher,
    updateTeacherProfile,
    uploadTeacherImage
}
