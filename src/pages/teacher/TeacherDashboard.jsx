import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, Bell, CheckCircle, DollarSign, TrendingUp, Calendar, Award, Clock, Users, BarChart3, User } from 'lucide-react'
import Header from '../../layouts/Header'
import PendingRequests from '../../components/teacher/PendingRequests'
import ApprovedSessions from '../../components/teacher/ApprovedSessions'
import CompletedSessions from '../../components/teacher/CompletedSessions'

const TeacherDashboard = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('pending')
    const [sessions, setSessions] = useState([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [timeRange, setTimeRange] = useState('monthly')
    const [teacherProfile, setTeacherProfile] = useState(null)

    // All teachers data (same as in TeacherManagement)
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

    // Earnings data
    const earningsData = {
        totalEarnings: 45000,
        thisMonth: 8500,
        lastPayout: 6200,
        monthlyData: [
            { month: 'Jul', amount: 5200 },
            { month: 'Aug', amount: 6800 },
            { month: 'Sep', amount: 7200 },
            { month: 'Oct', amount: 6500 },
            { month: 'Nov', amount: 7800 },
            { month: 'Dec', amount: 8500 }
        ]
    }

    useEffect(() => {
        window.scrollTo(0, 0)

        const isAuthenticated = localStorage.getItem('teacherAuth')
        if (!isAuthenticated) {
            navigate('/')
            return
        }

        // Get logged-in teacher's email
        const teacherEmail = localStorage.getItem('teacherEmail')

        // Find teacher profile by email
        const currentTeacher = allTeachers.find(t => t.email === teacherEmail)

        if (currentTeacher) {
            setTeacherProfile(currentTeacher)
        } else {
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

        setSessions([
            {
                id: 'BK001',
                userName: 'Sarah Jenkins',
                userEmail: 'sarah@example.com',
                yogaType: 'Vinyasa',
                date: '2025-12-10',
                time: '07:00 AM',
                duration: '60 min',
                status: 'pending'
            },
            {
                id: 'BK002',
                userName: 'Michael Brown',
                userEmail: 'michael@example.com',
                yogaType: 'Hatha',
                date: '2025-12-12',
                time: '08:00 AM',
                duration: '60 min',
                status: 'pending'
            },
            {
                id: 'BK003',
                userName: 'Emily Davis',
                userEmail: 'emily@example.com',
                yogaType: 'Yin',
                date: '2025-12-15',
                time: '06:00 PM',
                duration: '60 min',
                status: 'approved'
            },
            {
                id: 'BK004',
                userName: 'John Smith',
                userEmail: 'john@example.com',
                yogaType: 'Power Yoga',
                date: '2025-12-01',
                time: '07:00 AM',
                duration: '60 min',
                status: 'completed',
                completedDate: '2025-12-01'
            }
        ])
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('teacherAuth')
        localStorage.removeItem('teacherEmail')
        navigate('/')
    }

    const handleApprove = (id) => {
        setSessions(sessions.map(s =>
            s.id === id ? { ...s, status: 'approved' } : s
        ))
        setSuccessMessage('Session approved successfully!')
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const handleReject = (id) => {
        setSessions(sessions.filter(s => s.id !== id))
        setSuccessMessage('Session rejected')
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const handleMarkCompleted = (id) => {
        setSessions(sessions.map(s =>
            s.id === id ? { ...s, status: 'completed', completedDate: new Date().toISOString() } : s
        ))
        setSuccessMessage('Session marked as completed!')
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const pendingRequests = sessions.filter(s => s.status === 'pending')
    const approvedSessions = sessions.filter(s => s.status === 'approved')
    const completedSessions = sessions.filter(s => s.status === 'completed')

    const tabs = [
        { id: 'pending', label: 'Pending Requests', count: pendingRequests.length, color: 'orange' },
        { id: 'approved', label: 'Approved Sessions', count: approvedSessions.length, color: 'green' },
        { id: 'completed', label: 'Completed', count: completedSessions.length, color: 'gray' }
    ]

    const completionRate = 85 // Mock data

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="pt-20">
                {/* Top Stats Cards */}
                <section className="bg-white py-6 border-b border-gray-200">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Pending Card - Purple */}
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm mb-1">Pending Requests</p>
                                        <p className="text-3xl font-bold">{pendingRequests.length}+</p>
                                    </div>
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Clock size={28} />
                                    </div>
                                </div>
                            </div>

                            {/* Approved Card - Blue */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm mb-1">Approved Sessions</p>
                                        <p className="text-3xl font-bold">{approvedSessions.length}+</p>
                                    </div>
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                        <CheckCircle size={28} />
                                    </div>
                                </div>
                            </div>

                            {/* Completed Card - Red/Pink */}
                            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-pink-100 text-sm mb-1">Completed Sessions</p>
                                        <p className="text-3xl font-bold">{teacherProfile?.totalSessions || 0}+</p>
                                    </div>
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Users size={28} />
                                    </div>
                                </div>
                            </div>

                            {/* Earnings Card - Orange */}
                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-100 text-sm mb-1">This Month Earnings</p>
                                        <p className="text-3xl font-bold">₹{(earningsData.thisMonth / 1000).toFixed(1)}k</p>
                                    </div>
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                        <DollarSign size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Dashboard Content */}
                <section className="py-8">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left: Earnings Overview - Takes 2 columns */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Earnings Chart */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
                                            <p className="text-sm text-gray-500">Overview of latest month</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].map((range) => (
                                                <button
                                                    key={range}
                                                    onClick={() => setTimeRange(range.toLowerCase())}
                                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${timeRange === range.toLowerCase()
                                                        ? 'bg-green-500 text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {range}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">₹{earningsData.thisMonth.toLocaleString()}</p>
                                            <p className="text-sm text-gray-500">Current Month Earnings</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">{completedSessions.length + approvedSessions.length}</p>
                                            <p className="text-sm text-gray-500">Current Month Sessions</p>
                                        </div>
                                    </div>

                                    <button className="mb-6 px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                                        Last Month Summary
                                    </button>

                                    {/* Line Chart Area */}
                                    <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                                        <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                                            {/* Grid lines */}
                                            {[0, 50, 100, 150, 200].map((y) => (
                                                <line
                                                    key={y}
                                                    x1="0"
                                                    y1={y}
                                                    x2="600"
                                                    y2={y}
                                                    stroke="#e5e7eb"
                                                    strokeWidth="1"
                                                />
                                            ))}

                                            {/* Area fills */}
                                            <defs>
                                                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 0.3 }} />
                                                    <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0 }} />
                                                </linearGradient>
                                                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.3 }} />
                                                    <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 0 }} />
                                                </linearGradient>
                                                <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
                                                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                                                </linearGradient>
                                            </defs>

                                            {/* Line 1 - Pink */}
                                            <path
                                                d="M 0,120 Q 100,80 200,100 T 400,90 T 600,70"
                                                fill="url(#grad1)"
                                                opacity="0.5"
                                            />
                                            <path
                                                d="M 0,120 Q 100,80 200,100 T 400,90 T 600,70"
                                                fill="none"
                                                stroke="#ec4899"
                                                strokeWidth="3"
                                            />

                                            {/* Line 2 - Orange */}
                                            <path
                                                d="M 0,140 Q 100,110 200,120 T 400,110 T 600,90"
                                                fill="url(#grad2)"
                                                opacity="0.5"
                                            />
                                            <path
                                                d="M 0,140 Q 100,110 200,120 T 400,110 T 600,90"
                                                fill="none"
                                                stroke="#f97316"
                                                strokeWidth="3"
                                            />

                                            {/* Line 3 - Purple */}
                                            <path
                                                d="M 0,160 Q 100,130 200,140 T 400,125 T 600,105"
                                                fill="url(#grad3)"
                                                opacity="0.5"
                                            />
                                            <path
                                                d="M 0,160 Q 100,130 200,140 T 400,125 T 600,105"
                                                fill="none"
                                                stroke="#8b5cf6"
                                                strokeWidth="3"
                                            />
                                        </svg>

                                        {/* Month labels */}
                                        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month) => (
                                                <span key={month}>{month}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Stats */}
                                    <div className="grid grid-cols-4 gap-4 mt-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                                <DollarSign size={20} className="text-pink-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Wallet Balance</p>
                                                <p className="text-sm font-bold text-gray-900">₹3,567</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                <Award size={20} className="text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Referral Earning</p>
                                                <p className="text-sm font-bold text-gray-900">₹1,589</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <BarChart3 size={20} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Estimate sales</p>
                                                <p className="text-sm font-bold text-gray-900">₹2,651</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                                <TrendingUp size={20} className="text-cyan-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Earning</p>
                                                <p className="text-sm font-bold text-gray-900">₹53,567</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activities */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
                                    <div className="space-y-4">
                                        {[
                                            { time: '40 Mins Ago', icon: 'bg-pink-100 text-pink-600', title: 'Session Completed', desc: 'Emily completed Vinyasa session' },
                                            { time: '1 day ago', icon: 'bg-purple-100 text-purple-600', title: 'New Booking', desc: 'Michael booked Hatha session' },
                                            { time: '40 Mins Ago', icon: 'bg-cyan-100 text-cyan-600', title: 'Payout Received', desc: 'Amount ₹6,200 credited' }
                                        ].map((activity, idx) => (
                                            <div key={idx} className="flex items-center space-x-4">
                                                <div className="text-sm text-gray-500 w-24">{activity.time}</div>
                                                <div className={`w-10 h-10 ${activity.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                    <CheckCircle size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{activity.title}</p>
                                                    <p className="text-sm text-gray-500">{activity.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Analytics */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Analytics</h3>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Donut Chart */}
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="relative w-48 h-48">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                {/* Background circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#f3f4f6"
                                                    strokeWidth="12"
                                                />
                                                {/* Progress segments */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#8b5cf6"
                                                    strokeWidth="12"
                                                    strokeDasharray={`${completionRate * 2.51} ${251 - completionRate * 2.51}`}
                                                    strokeLinecap="round"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#ef4444"
                                                    strokeWidth="12"
                                                    strokeDasharray="20 231"
                                                    strokeDashoffset={-completionRate * 2.51}
                                                    strokeLinecap="round"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#eab308"
                                                    strokeWidth="12"
                                                    strokeDasharray="15 236"
                                                    strokeDashoffset={-(completionRate * 2.51 + 20)}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <p className="text-4xl font-bold text-gray-900">{completionRate}%</p>
                                                <p className="text-sm text-gray-500">Completion</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                                                <span className="text-sm text-gray-700">Completed</span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">85%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <span className="text-sm text-gray-700">Cancelled</span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">8%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <span className="text-sm text-gray-700">Rescheduled</span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">7%</span>
                                        </div>
                                    </div>

                                    {/* Teacher Profile Mini */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <img
                                                src={teacherProfile?.image}
                                                alt={teacherProfile?.name}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-yoga-sage-200"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{teacherProfile?.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {Array.isArray(teacherProfile?.specialization)
                                                        ? teacherProfile.specialization.join(', ')
                                                        : teacherProfile?.specialization}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/teacher/profile"
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-yoga-sage-100 hover:bg-yoga-sage-200 rounded-xl transition-colors text-yoga-sage-700 font-medium mb-2"
                                        >
                                            <User size={18} />
                                            <span>View Profile</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-700 font-medium"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Session Management Table */}
                        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Session Management</h3>

                            {/* Tabs */}
                            <div className="flex space-x-2 mb-6 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-2.5 rounded-xl font-medium transition-colors whitespace-nowrap flex items-center space-x-2 ${activeTab === tab.id
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span>{tab.label}</span>
                                        {tab.count > 0 && (
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id
                                                ? 'bg-white text-purple-600'
                                                : `bg-${tab.color}-100 text-${tab.color}-600`
                                                }`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'pending' && (
                                <PendingRequests
                                    requests={pendingRequests}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            )}

                            {activeTab === 'approved' && (
                                <ApprovedSessions
                                    sessions={approvedSessions}
                                    onMarkCompleted={handleMarkCompleted}
                                />
                            )}

                            {activeTab === 'completed' && (
                                <CompletedSessions sessions={completedSessions} />
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-up z-50">
                    <CheckCircle size={24} />
                    <span className="font-medium">{successMessage}</span>
                </div>
            )}
        </div>
    )
}

export default TeacherDashboard
