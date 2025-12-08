import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Award, Star, TrendingUp, Calendar, User, Edit2 } from 'lucide-react'
import Header from '../../layouts/Header'
import Button from '../../components/ui/Button'

const TeacherProfile = () => {
    const navigate = useNavigate()
    const [teacherProfile, setTeacherProfile] = useState(null)

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
            title: 'Life Coach (Guide and Therapeutic Counselor for Young Adults)'
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
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherProfile
