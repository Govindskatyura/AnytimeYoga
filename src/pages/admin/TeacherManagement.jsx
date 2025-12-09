import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, CheckCircle, XCircle, Edit, Ban, Star } from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'

const TeacherManagement = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [activeTab, setActiveTab] = useState('pending')

    useEffect(() => {
        window.scrollTo(0, 0)

        // Check auth
        const isAuthenticated = localStorage.getItem('adminAuth')
        if (!isAuthenticated) {
            navigate('/admin/login')
            return
        }

        // Mock teachers data
        setTeachers([
            { id: 'TCH001', name: 'Emma Wilson', email: 'emma@anytimeyoga.com', specialization: ['Vinyasa', 'Hatha'], status: 'approved', totalSessions: 45, rating: 4.8 },
            { id: 'TCH002', name: 'David Lee', email: 'david@anytimeyoga.com', specialization: ['Power Yoga', 'Yin'], status: 'approved', totalSessions: 32, rating: 4.6 },
            { id: 'TCH003', name: 'Sophie Martinez', email: 'sophie@anytimeyoga.com', specialization: ['Kundalini', 'Meditation'], status: 'pending', totalSessions: 0, rating: 0 },
            { id: 'TCH004', name: 'James Chen', email: 'james@anytimeyoga.com', specialization: ['Vinyasa', 'Power Yoga'], status: 'pending', totalSessions: 0, rating: 0 },
            { id: 'TCH005', name: 'Lisa Anderson', email: 'lisa@anytimeyoga.com', specialization: ['Hatha', 'Yin'], status: 'disabled', totalSessions: 28, rating: 4.5 },
            {
                id: 'TCH006',
                name: 'Abhay Pandey',
                email: 'abhaypandey567@gmail.com',
                phone: '+91 745 485 0412',
                title: 'Life Coach (Guide and Therapeutic Counselor for Young Adults)',
                specialization: ['Life Coaching', 'Counseling', 'Hatha', 'Vinyasa', 'Restorative', 'Meditation'],
                status: 'approved',
                totalSessions: 0,
                rating: 0,
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
            }
        ])
    }, [navigate])

    const handleApprove = (id) => {
        setTeachers(teachers.map(t =>
            t.id === id ? { ...t, status: 'approved' } : t
        ))
    }

    const handleReject = (id) => {
        setTeachers(teachers.filter(t => t.id !== id))
    }

    const handleDisable = (id) => {
        setTeachers(teachers.map(t =>
            t.id === id ? { ...t, status: 'disabled' } : t
        ))
    }

    const pendingTeachers = teachers.filter(t => t.status === 'pending')
    const approvedTeachers = teachers.filter(t => t.status === 'approved')
    const disabledTeachers = teachers.filter(t => t.status === 'disabled')

    const getStatusBadge = (status) => {
        const styles = {
            approved: 'bg-green-100 text-green-700',
            pending: 'bg-orange-100 text-orange-700',
            disabled: 'bg-gray-100 text-gray-700'
        }
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    const renderTeacherCard = (teacher) => (
        <div key={teacher.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{teacher.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{teacher.email}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {teacher.specialization.map((spec, i) => (
                            <span key={i} className="px-2 py-1 bg-yoga-lavender-100 text-yoga-lavender-700 text-xs rounded-full">
                                {spec}
                            </span>
                        ))}
                    </div>
                    {teacher.status === 'approved' && (
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{teacher.totalSessions} sessions</span>
                            <div className="flex items-center space-x-1">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span>{teacher.rating}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {getStatusBadge(teacher.status)}
                </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-gray-200">
                {teacher.status === 'pending' && (
                    <>
                        <button
                            onClick={() => handleApprove(teacher.id)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <CheckCircle size={18} />
                            <span>Approve</span>
                        </button>
                        <button
                            onClick={() => handleReject(teacher.id)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            <XCircle size={18} />
                            <span>Reject</span>
                        </button>
                    </>
                )}
                {teacher.status === 'approved' && (
                    <>
                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                            <Edit size={18} />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={() => handleDisable(teacher.id)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
                        >
                            <Ban size={18} />
                            <span>Disable</span>
                        </button>
                    </>
                )}
                {teacher.status === 'disabled' && (
                    <button
                        onClick={() => handleApprove(teacher.id)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        <CheckCircle size={18} />
                        <span>Re-enable</span>
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:ml-64 min-h-screen">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <Menu size={24} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
                                <p className="text-sm text-gray-600">{teachers.length} total teachers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'pending'
                                ? 'bg-orange-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            Pending ({pendingTeachers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('approved')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'approved'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            Approved ({approvedTeachers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('disabled')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'disabled'
                                ? 'bg-gray-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            Disabled ({disabledTeachers.length})
                        </button>
                    </div>

                    {/* Teachers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeTab === 'pending' && pendingTeachers.map(renderTeacherCard)}
                        {activeTab === 'approved' && approvedTeachers.map(renderTeacherCard)}
                        {activeTab === 'disabled' && disabledTeachers.map(renderTeacherCard)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherManagement
