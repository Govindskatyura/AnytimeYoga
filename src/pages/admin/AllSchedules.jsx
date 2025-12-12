import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, ChevronLeft, ChevronRight, Search, Filter, Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'
import { api } from '../../services/api'
import cosmicBg from '../../assets/images/cosmic-bg.png'

const AllSchedules = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [sessions, setSessions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)

        const auth = JSON.parse(localStorage.getItem('adminAuth'))
        if (!auth || (auth.role !== 'admin' && !auth.isAdmin)) {
            navigate('/login')
            return
        }

        const fetchSessions = async () => {
            try {
                const data = await api.getBookings(auth.token)
                setSessions(data)
            } catch (error) {
                console.error('Failed to fetch schedules:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSessions()
    }, [navigate])

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const days = []

        for (let i = 0; i < firstDay; i++) {
            days.push(null)
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i)
        }

        return days
    }

    const getSessionsForDate = (day) => {
        if (!day) return []
        // Compare date strings properly. Date object in DB might be ISO.
        // Simplified comparison:
        const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        return sessions.filter(s => {
            const sDate = new Date(s.date)
            return sDate.getDate() === day &&
                sDate.getMonth() === currentDate.getMonth() &&
                sDate.getFullYear() === currentDate.getFullYear()
        })
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/20'
            case 'pending': return 'bg-orange-500/20 text-orange-300 border-orange-500/20'
            case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/20'
            case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/20'
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/20'
        }
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

            {/* Sidebar (Mobile Overlay / Desktop Stub for consistency if needed, but here simplified as back button + full width or reusing AdminSidebar if refactored. 
               For now, I will use a simple top nav with Back to Dashboard to avoid code duplication of the sidebar logic or creating a layout file in this short task.)
            */}

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Navbar */}
                <header className="bg-gray-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-display font-bold text-white">All Schedules</h1>
                    </div>
                </header>

                <div className="p-6 md:p-10 flex-1">
                    {/* Calendar Container */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                        {/* Month Navigation */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <h2 className="text-2xl font-display font-bold text-white flex items-center">
                                <Calendar className="mr-3 text-yoga-sage-400" />
                                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h2>
                            <div className="flex items-center space-x-2 bg-black/20 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="px-4 py-2 text-sm font-medium text-yoga-sage-300 hover:text-white"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 md:gap-4 mb-8">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="text-center font-bold text-gray-400 uppercase text-xs tracking-wider py-2">
                                    {day}
                                </div>
                            ))}

                            {getDaysInMonth().map((day, index) => {
                                const daySessions = getSessionsForDate(day)
                                return (
                                    <div
                                        key={index}
                                        className={`min-h-[120px] border border-white/5 rounded-2xl p-3 transition-colors ${day ? 'bg-white/5 hover:bg-white/10' : 'bg-transparent border-transparent'
                                            }`}
                                    >
                                        {day && (
                                            <>
                                                <div className={`font-medium mb-2 ${day === new Date().getDate() &&
                                                        currentDate.getMonth() === new Date().getMonth() &&
                                                        currentDate.getFullYear() === new Date().getFullYear()
                                                        ? 'w-7 h-7 bg-yoga-sage-500 rounded-full flex items-center justify-center text-white shadow-lg'
                                                        : 'text-gray-300'
                                                    }`}>
                                                    {day}
                                                </div>
                                                <div className="space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">
                                                    {daySessions.map((session) => (
                                                        <div
                                                            key={session._id || session.id}
                                                            className={`text-[10px] p-1.5 rounded-lg border ${getStatusColor(session.status)} truncate cursor-pointer hover:opacity-80 transition-opacity`}
                                                            title={`${session.time} - ${session.yogaType} by ${session.teacherName}`}
                                                        >
                                                            <div className="flex items-center space-x-1">
                                                                <Clock size={10} />
                                                                <span>{session.time}</span>
                                                            </div>
                                                            <div className="truncate font-semibold">{session.yogaType}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 items-center justify-center border-t border-white/10 pt-6">
                            {[
                                { label: 'Pending', color: 'bg-orange-500' },
                                { label: 'Confirmed', color: 'bg-green-500' },
                                { label: 'Completed', color: 'bg-blue-500' },
                                { label: 'Cancelled', color: 'bg-red-500' }
                            ].map(item => (
                                <div key={item.label} className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-${item.color}/50`}></div>
                                    <span className="text-sm text-gray-400">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllSchedules
