import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, Bell, CheckCircle, DollarSign, TrendingUp, Calendar, Award, Clock, Users, BarChart3, User, Search, Filter, ChevronDown, List, Grid } from 'lucide-react'
import PendingRequests from '../../components/teacher/PendingRequests'
import ApprovedSessions from '../../components/teacher/ApprovedSessions'
import CompletedSessions from '../../components/teacher/CompletedSessions'
import { api } from '../../services/api'
import cosmicBg from '../../assets/images/cosmic-bg.png'
import yogaAvatar from '../../assets/images/yoga-avatar.png'

const TeacherDashboard = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('pending')
    const [sessions, setSessions] = useState([])
    const [teacherProfile, setTeacherProfile] = useState(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [timeRange, setTimeRange] = useState('monthly')
    const [teacherAuth, setTeacherAuth] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const auth = JSON.parse(localStorage.getItem('teacherAuth'))
        if (!auth) {
            navigate('/')
            return
        }
        setTeacherAuth(auth)
        setTeacherProfile(auth)

        const fetchBookings = async () => {
            try {
                const data = await api.getBookings(auth.token)
                const mySessions = data.filter(session =>
                    session.teacher === auth.email ||
                    session.teacher === auth._id ||
                    session.teacherName === auth.name
                )
                setSessions(mySessions)
            } catch (error) {
                console.error('Failed to fetch bookings:', error)
            }
        }

        fetchBookings()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('teacherAuth')
        localStorage.removeItem('teacherEmail')
        navigate('/')
    }

    const handleApprove = async (id) => {
        try {
            await api.updateBookingStatus(id, 'Confirmed', teacherAuth.token)
            setSessions(sessions.map(s => s._id === id ? { ...s, status: 'Confirmed' } : s))
            showToast('Session confirmed successfully!')
        } catch (error) {
            console.error('Approval failed:', error)
        }
    }

    const handleReject = async (id) => {
        try {
            await api.updateBookingStatus(id, 'Cancelled', teacherAuth.token)
            setSessions(sessions.map(s => s._id === id ? { ...s, status: 'Cancelled' } : s))
            showToast('Session cancelled')
        } catch (error) {
            console.error('Rejection failed:', error)
        }
    }

    const handleMarkCompleted = async (id) => {
        try {
            await api.updateBookingStatus(id, 'Completed', teacherAuth.token)
            setSessions(sessions.map(s => s._id === id ? { ...s, status: 'Completed', completedDate: new Date().toISOString() } : s))
            showToast('Session marked as completed!')
        } catch (error) {
            console.error('Completion update failed:', error)
        }
    }

    const showToast = (msg) => {
        setSuccessMessage(msg)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const pendingRequests = sessions.filter(s => s.status?.toLowerCase() === 'pending')
    const approvedSessions = sessions.filter(s => s.status?.toLowerCase() === 'confirmed')
    const completedSessions = sessions.filter(s => s.status?.toLowerCase() === 'completed')

    const earningsData = {
        thisMonth: sessions.reduce((acc, curr) => acc + (parseInt(curr.amount) || 0), 0)
    }

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const tabs = [
        { id: 'pending', label: 'Requests', count: pendingRequests.length, icon: Clock },
        { id: 'approved', label: 'Upcoming', count: approvedSessions.length, icon: Calendar },
        { id: 'completed', label: 'Past Sessions', count: completedSessions.length, icon: CheckCircle }
    ]

    return (
        <div className="min-h-screen font-sans text-gray-100 selection:bg-yoga-sage-500 selection:text-white" style={{
            backgroundImage: `url(${cosmicBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] z-0"></div>

            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-gray-900/50 backdrop-blur-xl">
                <div className="container-custom py-3 flex justify-between items-center px-4 md:px-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yoga-sage-400 to-yoga-sage-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-yoga-sage-500/20">
                            AY
                        </div>
                        <span className="font-display font-semibold text-lg text-white tracking-wide">Teacher Portal</span>
                        <Link to="/" className="ml-6 flex items-center space-x-2 text-xs font-medium text-yoga-sage-300 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                            <ChevronDown className="rotate-90" size={12} />
                            <span>Go Home</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            <Calendar size={16} className="text-yoga-sage-300" />
                            <span>{today}</span>
                        </div>

                        <div className="flex items-center space-x-4 pl-6 border-l border-white/10">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-white">{teacherProfile?.name}</p>
                                <p className="text-xs text-yoga-sage-300">Instructor</p>
                            </div>
                            <img
                                src={yogaAvatar}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shadow-md cursor-pointer hover:border-yoga-sage-400 transition-colors"
                                onClick={() => navigate('/teacher/profile')}
                            />
                            <button onClick={handleLogout} className="p-2 hover:bg-white/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 container-custom py-24 px-4">
                {/* Welcome Section */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <h1 className="font-display text-4xl font-bold text-white mb-2">Welcome back, {teacherProfile?.name?.split(' ')[0]}! 🌿</h1>
                        <p className="text-gray-400 text-lg">Here's what's happening with your sessions today.</p>
                    </div>
                    {/* Optional Quick Action Button */}
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Card 1: Pending */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:bg-white/10 transition-all group duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-yoga-peach-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock size={24} className="text-yoga-peach-400" />
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pendingRequests.length > 0 ? 'bg-yoga-peach-500/20 text-yoga-peach-300' : 'bg-white/5 text-gray-400'}`}>
                                {pendingRequests.length > 0 ? 'Action Needed' : 'All Clear'}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Pending Requests</h3>
                        <p className="font-display text-3xl font-bold text-white">{pendingRequests.length}</p>
                    </div>

                    {/* Card 2: Upcoming */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:bg-white/10 transition-all group duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-yoga-lavender-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Calendar size={24} className="text-yoga-lavender-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Upcoming Sessions</h3>
                        <p className="font-display text-3xl font-bold text-white">{approvedSessions.length}</p>
                    </div>

                    {/* Card 3: Total Impact */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:bg-white/10 transition-all group duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users size={24} className="text-blue-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Impact</h3>
                        <p className="font-display text-3xl font-bold text-white">
                            {teacherProfile?.totalSessions ? teacherProfile.totalSessions + completedSessions.length : completedSessions.length}
                        </p>
                    </div>

                    {/* Card 4: Earnings */}
                    <div className="bg-gradient-to-br from-yoga-sage-900/40 to-yoga-sage-800/40 backdrop-blur-xl border border-yoga-sage-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yoga-sage-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="w-12 h-12 bg-yoga-sage-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <DollarSign size={24} className="text-yoga-sage-400" />
                            </div>
                            <span className="text-yoga-sage-300 text-xs font-bold flex items-center bg-yoga-sage-500/10 px-2 py-1 rounded-full">
                                <TrendingUp size={14} className="mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-yoga-sage-200 text-sm font-medium mb-1 relative z-10">Monthly Earnings</h3>
                        <p className="font-display text-3xl font-bold text-white relative z-10">₹{(earningsData.thisMonth / 1000).toFixed(1)}k</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[500px]">
                    {/* Custom Tabs */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-6 border-b border-white/5 gap-4">
                        <div className="flex p-1 bg-black/20 rounded-xl overflow-x-auto no-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-yoga-sage-500 text-white shadow-lg shadow-yoga-sage-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <tab.icon size={16} />
                                    <span>{tab.label}</span>
                                    {tab.count > 0 && (
                                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id
                                            ? 'bg-white/20 text-white'
                                            : 'bg-white/10 text-gray-300'
                                            }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 w-full md:w-64 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-8">
                        {activeTab === 'pending' && (
                            <div className="animate-fade-in">
                                {pendingRequests.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle size={40} className="text-yoga-sage-400/50" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
                                        <p className="text-gray-400">You have no pending booking requests.</p>
                                    </div>
                                ) : (
                                    <PendingRequests
                                        requests={pendingRequests}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'approved' && (
                            <div className="animate-fade-in">
                                {approvedSessions.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <Calendar size={40} className="text-yoga-lavender-400/50" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">No Upcoming Sessions</h3>
                                        <p className="text-gray-400">Your schedule is clear for now.</p>
                                    </div>
                                ) : (
                                    <ApprovedSessions
                                        sessions={approvedSessions}
                                        onMarkCompleted={handleMarkCompleted}
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'completed' && (
                            <div className="animate-fade-in">
                                {completedSessions.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                            <Clock size={40} className="text-blue-400/50" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">No History Yet</h3>
                                        <p className="text-gray-400">Completed sessions will appear here.</p>
                                    </div>
                                ) : (
                                    <CompletedSessions sessions={completedSessions} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Float Notification */}
            {showSuccess && (
                <div className="fixed bottom-6 right-6 bg-yoga-sage-600/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-up z-50 border border-yoga-sage-500/50">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Success</p>
                        <p className="text-yoga-sage-100 text-xs">{successMessage}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeacherDashboard
