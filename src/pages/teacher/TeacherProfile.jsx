import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Award, Star, TrendingUp, Calendar, User, Edit2, BookOpen, Briefcase, GraduationCap, Lightbulb } from 'lucide-react'
import Header from '../../layouts/Header'
import Button from '../../components/ui/Button'

const TeacherProfile = () => {
    const navigate = useNavigate()
    const [teacherProfile, setTeacherProfile] = useState(null)
    const [showFullAbout, setShowFullAbout] = useState(false)

    // All teachers data (same as in TeacherDashboard)
    const allTeachers = [
        { id: 'TCH001', name: 'Emma Wilson', email: 'emma@anytimeyoga.com', specialization: ['Vinyasa', 'Hatha'], phone: '+91 98765 43210', totalSessions: 45, rating: 4.8, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
        { id: 'TCH002', name: 'David Lee', email: 'david@anytimeyoga.com', specialization: ['Power Yoga', 'Yin'], phone: '+91 98765 43211', totalSessions: 32, rating: 4.6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
        { id: 'TCH003', name: 'Sophie Martinez', email: 'sophie@anytimeyoga.com', specialization: ['Kundalini', 'Meditation'], phone: '+91 98765 43212', totalSessions: 0, rating: 0, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
        {
            id: 'TCH006',
            name: 'Abhay Pandey',
            email: 'abhaypandey567@gmail.com',
            phone: '+91 745 485 0412',
            specialization: ['Life Coaching', 'Counseling', 'Hatha', 'Vinyasa', 'Restorative', 'Meditation'],
            totalSessions: 0,
            rating: 0,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
            title: 'Life Coach (Guide and Therapeutic Counselor for Young Adults)',
            about: {
                passion: 'In this age of social media information onslaught, the teenage young adults are subject to extreme degrees of change, growth, and discovery. The teenage years are a time of stress, anxiety, and confusion and adolescents face a range of challenges, including academic pressure, social issues, family, and relationship conflicts. I strongly believe that there should be formal training and exposure to tools and methods that teenagers can learn to help ensure they have power to control their emotional well-being and navigate through the phases of confusion and distress due to changing conditions in their lives.',
                approach: 'As a young adult counselor, I have created a secure and confidential program focused on spiritual growth, self-confidence, and emotional renewal through tailored yoga exercises, relaxation methods, healing affirmations, and self-guided practices. I have many years of experience providing health and wellness support counselling that provides an all-around holistic mind, body, and soul healing. I have witnessed many teenagers successfully overcoming phases of addiction, anxiety, depression, and trauma. My expertise lies in combining evidence-based therapeutic techniques with trauma-informed yoga and mindfulness practices to foster a loving environment that automatically facilitates healing, emotional regulation, and sustainable recovery.'
            },
            keySkills: [
                'Ability to create a loving non-judgmental space',
                'Leverage past experiences to tailor a customized approach',
                'Ability to be perceived more as a guide than a teacher',
                'Deep knowledge of Hatha, Vinyasa, and Restorative Yoga',
                'Years of experience and knowledge of pranayama techniques and meditation practices',
                'Skilled in Mindfulness & Somatic Awareness Techniques',
                'Naturally gifted Empathetic Communicator & Active Listener',
                'Strict adherence to Confidentiality & Ethical Practices'
            ],
            expertise: [
                'Client Assessment & Course of Action Planning',
                'Addiction Counseling & Recovery Support',
                'Group Therapy Sessions',
                'Cognitive Behavioral Therapy (CBT)',
                'Group Facilitation & Workshop Coordination',
                'Motivational Interviewing',
                'Trauma-Informed Care Planning',
                'Crisis Intervention & De-escalation',
                'Yoga for Anxiety & Depression',
                'Relapse Prevention Planning',
                'Individual & Group Class Instruction',
                'Interdisciplinary Collaboration'
            ],
            education: [
                'Master of Science in Psychology / Counseling',
                'Registered Yoga Teacher - Yoga Alliance – The Yog Institute Mumbai'
            ],
            experience: [
                'Working as a freelance coach and counselor for various rehabilitation centers in India',
                'Served as a Yoga teacher in Convent school',
                'Conducted individual and group therapy sessions for a caseload of 25+ clients with substance use disorders and co-occurring mental health diagnoses',
                'Developed and implemented personalized treatment plans utilizing CBT and Motivational Interviewing to support clients\' recovery journeys',
                'Facilitated weekly psycho-educational groups on topics including relapse prevention, emotional regulation, and coping skills',
                'Designed and taught specialized yoga classes for individuals in addiction recovery, focusing on grounding, stress reduction, and reconnecting with the body',
                'Incorporated trauma-informed principles to ensure a safe and empowering environment for all participants',
                'Led guided meditation and pranayama (breathwork) sessions to help clients manage cravings and anxiety symptoms',
                'Tailored one-on-one yoga sessions for clients with specific physical or psychological needs',
                'Created and launched a unique 8-week program integrating yoga and mindfulness practices with cognitive-behavioral tools for mental wellness',
                'Managed all aspects of program delivery, including marketing, client intake, and session planning'
            ]
        },
        { id: 'TCH007', name: 'Priya Sharma', email: 'priya.sharma@anytimeyoga.com', specialization: ['Vinyasa', 'Power Yoga'], phone: '+91 98765 43210', totalSessions: 245, rating: 4.9, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
        { id: 'TCH008', name: 'Teacher Demo', email: 'teacher@anytimeyoga.com', specialization: ['All Styles'], phone: '+91 98765 43213', totalSessions: 100, rating: 4.7, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }
    ]

    useEffect(() => {
        window.scrollTo(0, 0)

        const isAuthenticated = localStorage.getItem('teacherAuth')
        if (!isAuthenticated) {
            navigate('/')
            return
        }

        // Get logged-in teacher's email
        const teacherEmail = localStorage.getItem('teacherEmail')
        console.log('Teacher Email from localStorage:', teacherEmail)

        // Find teacher profile by email
        const currentTeacher = allTeachers.find(t => t.email === teacherEmail)
        console.log('Found Teacher:', currentTeacher)

        if (currentTeacher) {
            setTeacherProfile(currentTeacher)
        } else {
            console.log('Teacher not found, using fallback')
            // Fallback to default teacher if email not found
            setTeacherProfile({
                name: 'Teacher',
                email: teacherEmail || 'teacher@anytimeyoga.com',
                phone: '+91 00000 00000',
                specialization: ['Yoga'],
                totalSessions: 0,
                rating: 0,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
            })
        }
    }, [navigate])

    if (!teacherProfile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-yoga-sage-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="pt-20 pb-12">
                <section className="py-8">
                    <div className="container-custom max-w-5xl">
                        {/* Back Button */}
                        <Link
                            to="/teacher/dashboard"
                            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yoga-sage-600 transition-colors mb-6 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Dashboard</span>
                        </Link>

                        {/* Profile Header Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                            {/* Cover Image */}
                            <div className="h-32 bg-gradient-to-r from-yoga-sage-400 via-yoga-lavender-400 to-yoga-peach-400"></div>

                            {/* Profile Info */}
                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
                                    {/* Profile Image */}
                                    <img
                                        src={teacherProfile.image}
                                        alt={teacherProfile.name}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mb-4 md:mb-0"
                                    />

                                    {/* Name and Title */}
                                    <div className="flex-grow">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                                    {teacherProfile.name}
                                                </h1>
                                                {teacherProfile.title && (
                                                    <p className="text-sm text-gray-600 mb-2">{teacherProfile.title}</p>
                                                )}
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-1">
                                                        <Star size={18} fill="#fbbf24" className="text-yellow-400" />
                                                        <span className="font-semibold text-gray-900">
                                                            {teacherProfile.rating > 0 ? teacherProfile.rating.toFixed(1) : 'New'}
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-600">
                                                        {teacherProfile.totalSessions} Sessions Completed
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Edit Profile Button (Future Enhancement) */}
                                            <button className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-4 py-2 bg-yoga-sage-500 hover:bg-yoga-sage-600 text-white rounded-xl transition-colors font-medium">
                                                <Edit2 size={18} />
                                                <span>Edit Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Total Sessions */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Calendar size={24} className="text-purple-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{teacherProfile.totalSessions}</span>
                                </div>
                                <p className="text-sm text-gray-600 font-medium">Total Sessions</p>
                            </div>

                            {/* Rating */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                        <Award size={24} className="text-yellow-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {teacherProfile.rating > 0 ? teacherProfile.rating.toFixed(1) : 'N/A'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 font-medium">Average Rating</p>
                            </div>

                            {/* Earnings (Mock) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <TrendingUp size={24} className="text-green-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">₹{(teacherProfile.totalSessions * 500).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-600 font-medium">Total Earnings</p>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                    <User size={24} className="text-yoga-sage-600" />
                                    <span>Contact Information</span>
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Email</p>
                                            <p className="text-sm text-gray-900 font-medium">{teacherProfile.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Phone</p>
                                            <p className="text-sm text-gray-900 font-medium">{teacherProfile.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specializations */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                    <Award size={24} className="text-yoga-sage-600" />
                                    <span>Specializations</span>
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(teacherProfile.specialization) ? (
                                        teacherProfile.specialization.map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 bg-gradient-to-r from-yoga-sage-100 to-yoga-lavender-100 text-yoga-sage-700 rounded-full text-sm font-medium border border-yoga-sage-200"
                                            >
                                                {spec}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="px-3 py-1.5 bg-gradient-to-r from-yoga-sage-100 to-yoga-lavender-100 text-yoga-sage-700 rounded-full text-sm font-medium border border-yoga-sage-200">
                                            {teacherProfile.specialization}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* About Section */}
                            {teacherProfile.about && (
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                        <BookOpen size={20} className="text-yoga-sage-600" />
                                        <span>About My Passion</span>
                                    </h2>
                                    <div className="text-gray-700">
                                        <p className="leading-relaxed text-sm">
                                            {showFullAbout
                                                ? teacherProfile.about.passion
                                                : `${teacherProfile.about.passion.substring(0, 200)}...`
                                            }
                                        </p>
                                        {showFullAbout && (
                                            <p className="leading-relaxed mt-3 text-sm">{teacherProfile.about.approach}</p>
                                        )}
                                        <button
                                            onClick={() => setShowFullAbout(!showFullAbout)}
                                            className="mt-3 text-yoga-sage-600 hover:text-yoga-sage-700 font-medium text-xs flex items-center space-x-1 transition-colors"
                                        >
                                            <span>{showFullAbout ? 'Read Less' : 'Read More'}</span>
                                            <svg
                                                className={`w-3 h-3 transition-transform ${showFullAbout ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Key Skills Section */}
                            {teacherProfile.keySkills && teacherProfile.keySkills.length > 0 && (
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                        <Lightbulb size={20} className="text-yoga-sage-600" />
                                        <span>Key Skills</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {teacherProfile.keySkills.map((skill, idx) => (
                                            <div key={idx} className="flex items-start space-x-2 p-2.5 bg-gradient-to-r from-yoga-sage-50 to-yoga-lavender-50 rounded-lg border border-yoga-sage-100">
                                                <div className="w-1.5 h-1.5 bg-yoga-sage-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <p className="text-xs text-gray-700 leading-relaxed">{skill}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Areas of Expertise Section */}
                            {teacherProfile.expertise && teacherProfile.expertise.length > 0 && (
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                        <Award size={20} className="text-yoga-sage-600" />
                                        <span>Areas of Expertise</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {teacherProfile.expertise.map((area, idx) => (
                                            <div key={idx} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                                                <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                <p className="text-xs text-gray-700 font-medium">{area}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education & Certifications Section */}
                            {teacherProfile.education && teacherProfile.education.length > 0 && (
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                        <GraduationCap size={20} className="text-yoga-sage-600" />
                                        <span>Education & Certifications</span>
                                    </h2>
                                    <div className="space-y-2">
                                        {teacherProfile.education.map((edu, idx) => (
                                            <div key={idx} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                                                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <GraduationCap size={16} className="text-purple-700" />
                                                </div>
                                                <p className="text-xs text-gray-800 font-medium leading-relaxed pt-0.5">{edu}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Professional Experience Section */}
                            {teacherProfile.experience && teacherProfile.experience.length > 0 && (
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                        <Briefcase size={20} className="text-yoga-sage-600" />
                                        <span>Professional Experience</span>
                                    </h2>
                                    <div className="space-y-2">
                                        {teacherProfile.experience.map((exp, idx) => (
                                            <div key={idx} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                <p className="text-xs text-gray-700 leading-relaxed">{exp}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherProfile
