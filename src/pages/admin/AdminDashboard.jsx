import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, Search, Bell, Settings, Menu, CreditCard, CheckCircle, Clock, X, LogOut, ChevronDown } from 'lucide-react'
import { api } from '../../services/api'
import cosmicBg from '../../assets/images/cosmic-bg.png'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeView, setActiveView] = useState('overview')
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        activeTeachers: 0,
        totalUsers: 0
    })
    const [recentBookings, setRecentBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [adminProfile, setAdminProfile] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        const auth = JSON.parse(localStorage.getItem('adminAuth'))
        if (!auth || (auth.role !== 'admin' && !auth.isAdmin)) {
            navigate('/login')
            return
        }
        setAdminProfile(auth)

        const fetchData = async () => {
            try {
                // Fetch All Bookings
                const bookings = await api.getBookings(auth.token)

                // Fetch Teachers (for stats)
                const teachers = await api.getTeachers()

                // Calculate Stats
                const revenue = bookings.reduce((acc, curr) => acc + (parseInt(curr.amount) || 0), 0)

                setStats({
                    totalRevenue: revenue,
                    totalBookings: bookings.length,
                    activeTeachers: teachers.length,
                    totalUsers: 142 // Mock for now or fetch if User API exists
                })

                setRecentBookings(bookings.slice(0, 5))
            } catch (error) {
                console.error('Failed to fetch admin data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('adminAuth')
        navigate('/')
    }

    const menuItems = [
        { title: 'Dashboard', active: true, onClick: () => { } },
        { title: 'User Management', onClick: () => navigate('/admin/users') },
        { title: 'Teachers', onClick: () => navigate('/admin/teachers') },
        { title: 'All Bookings', onClick: () => navigate('/admin/schedules') },
        { title: 'Payments', onClick: () => navigate('/admin/payments') },
        { title: 'Feedback', onClick: () => navigate('/admin/feedback') },
    ]

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{
                backgroundImage: `url(${cosmicBg})`,
                backgroundSize: 'cover'
            }}>
                <div className="w-16 h-16 border-4 border-yoga-sage-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen font-sans text-gray-100 selection:bg-yoga-sage-500 selection:text-white relative" style={{
            backgroundImage: `url(${cosmicBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] z-0"></div>

            <div className="relative z-10 flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-gray-900/80 backdrop-blur-xl border-r border-white/10 transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}>
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-10">
                            <div className="w-10 h-10 bg-gradient-to-br from-yoga-sage-400 to-yoga-sage-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-yoga-sage-500/20">
                                AY
                            </div>
                            <span className="font-display font-semibold text-lg text-white tracking-wide">AnyTime Yoga</span>
                        </div>

                        {/* Menu */}
                        <nav className="space-y-2 flex-grow">
                            <div className="text-xs font-semibold text-gray-500 mb-4 px-3 tracking-wider">ADMIN PLATFORM</div>
                            {menuItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={item.onClick}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${item.active
                                        ? 'bg-gradient-to-r from-yoga-sage-600/20 to-yoga-sage-400/10 border border-yoga-sage-500/30 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {/* Simplified Icons matching original layout logic or placeholders */}
                                    <span className={`text-sm font-medium ${item.active ? 'text-yoga-sage-300' : ''}`}>{item.title}</span>
                                    {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-yoga-sage-400 shadow-[0_0_8px_rgba(132,204,22,0.6)]"></div>}
                                </button>
                            ))}
                        </nav>

                        <div className="pt-6 mt-auto">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                            >
                                <LogOut size={18} />
                                <span className="font-medium">Logout Admin</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {/* Top Header */}
                    <header className="bg-gray-900/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                            <h2 className="text-xl font-display font-semibold text-white">Dashboard Overview</h2>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="hidden md:flex items-center space-x-4">
                                <span className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-white">{adminProfile?.name}</p>
                                    <p className="text-xs text-yoga-sage-400">Super Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 p-0.5">
                                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                                        <span className="font-bold text-white">A</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <main className="flex-1 overflow-y-auto p-6 md:p-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[
                                {
                                    label: 'Total Revenue',
                                    value: formatCurrency(stats.totalRevenue),
                                    icon: DollarSign,
                                    color: 'text-emerald-400',
                                    bg: 'bg-emerald-400/10',
                                    border: 'border-emerald-400/20'
                                },
                                {
                                    label: 'Total Bookings',
                                    value: stats.totalBookings,
                                    icon: Calendar,
                                    color: 'text-blue-400',
                                    bg: 'bg-blue-400/10',
                                    border: 'border-blue-400/20'
                                },
                                {
                                    label: 'Active Teachers',
                                    value: stats.activeTeachers,
                                    icon: GraduationCap,
                                    color: 'text-yoga-lavender-400',
                                    bg: 'bg-yoga-lavender-400/10',
                                    border: 'border-yoga-lavender-400/20'
                                },
                                {
                                    label: 'Registered Users',
                                    value: stats.totalUsers,
                                    icon: Users,
                                    color: 'text-orange-400',
                                    bg: 'bg-orange-400/10',
                                    border: 'border-orange-400/20'
                                }
                            ].map((stat, idx) => (
                                <div key={idx} className={`bg-white/5 backdrop-blur-xl border ${stat.border} rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-300 shadow-lg`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                                            <stat.icon className={stat.color} size={24} />
                                        </div>
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/5 text-gray-300">Live</span>
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Bookings Table */}
                            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Recent Bookings</h3>
                                    <button onClick={() => navigate('/admin/schedules')} className="text-sm text-yoga-sage-400 hover:text-yoga-sage-300 transition-colors">
                                        View All
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {recentBookings.length === 0 ? (
                                        <div className="text-center py-10 text-gray-500">No bookings found</div>
                                    ) : (
                                        recentBookings.map((booking) => (
                                            <div key={booking._id || booking.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 group">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yoga-sage-500/20 to-blue-500/20 flex items-center justify-center text-white border border-white/10">
                                                        <Calendar size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <h4 className="font-semibold text-white">{booking.userName}</h4>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-300 border border-green-500/20' :
                                                                    booking.status === 'Cancelled' ? 'bg-red-500/20 text-red-300 border border-red-500/20' :
                                                                        booking.status === 'Completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/20' :
                                                                            'bg-yellow-500/20 text-yellow-300 border border-yellow-500/20'
                                                                }`}>
                                                                {booking.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-400 mt-0.5 flex items-center space-x-2">
                                                            <span>{booking.teacherName}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                            <span>{booking.yogaType}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-white font-display">₹{booking.amount}</p>
                                                    <p className="text-xs text-gray-500">{booking.time}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Revenue Card (Placeholder Visual) */}
                            <div className="bg-gradient-to-br from-yoga-sage-900/60 to-gray-900/60 backdrop-blur-xl border border-yoga-sage-500/20 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yoga-sage-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                                <div>
                                    <div className="flex items-center space-x-2 text-yoga-sage-300 mb-2">
                                        <TrendingUp size={18} />
                                        <span className="text-sm font-medium">Monthly Growth</span>
                                    </div>
                                    <h3 className="text-4xl font-display font-bold text-white mb-1">+24.5%</h3>
                                    <p className="text-sm text-gray-400">Revenue increase compared to last month</p>
                                </div>

                                <div className="mt-8 relative h-32">
                                    {/* Simple CSS Bar Chart Visualization */}
                                    <div className="absolute inset-0 flex items-end justify-between px-2">
                                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                                            <div key={i} className="w-8 bg-gradient-to-t from-yoga-sage-500 to-yoga-sage-400/50 rounded-t-lg transition-all duration-300 hover:opacity-100 opacity-80" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={() => navigate('/admin/payments')} className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium border border-white/10 transition-colors">
                                    View Payment Report
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
