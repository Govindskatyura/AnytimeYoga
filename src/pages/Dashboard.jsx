import React, { useState, useEffect } from 'react'
import { LayoutDashboard, Calendar, CreditCard, MessageSquare, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Overview from '../components/dashboard/Overview'
import ScheduleSession from '../components/dashboard/ScheduleSession'
import Payments from '../components/dashboard/Payments'
import Feedback from '../components/dashboard/Feedback'
import { api } from '../services/api'


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview')
    const [bookings, setBookings] = useState([])
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        const userAuth = JSON.parse(localStorage.getItem('userAuth'))
        if (!userAuth) {
            navigate('/login')
            return
        }
        setUser(userAuth)

        const fetchBookings = async () => {
            try {
                const data = await api.getBookings(userAuth.token)
                setBookings(data)
            } catch (error) {
                console.error('Failed to fetch bookings:', error)
            }
        }

        fetchBookings()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('userAuth')
        navigate('/login')
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div>
                        <Overview />
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Your Upcoming Sessions</h2>
                            {bookings.length > 0 ? (
                                <div className="space-y-4">
                                    {bookings.map(booking => (
                                        <div key={booking._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-gray-800">{booking.yogaType}</h3>
                                                <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                                                <p className="text-sm text-gray-500">Instructor: {booking.teacherName}</p>
                                            </div>
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 bg-white p-6 rounded-xl text-center">No bookings yet. Schedule your first session!</p>
                            )}
                        </div>
                    </div>
                )
            case 'schedule': return <ScheduleSession /> // This component likely has its own logic or static content, fine for now
            case 'payments': return <Payments />
            case 'feedback': return <Feedback />
            default: return <Overview />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yoga-sage-400 to-yoga-lavender-400 rounded-full flex items-center justify-center text-white font-bold">
                            🧘
                        </div>
                        <span className="font-display font-bold text-xl text-gray-900">Anytime Yoga</span>
                    </div>
                </div>

                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{user?.name || 'User'}</h3>
                            <p className="text-xs text-gray-500">Member</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-yoga-sage-50 text-yoga-sage-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'schedule' ? 'bg-yoga-sage-50 text-yoga-sage-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Calendar size={20} />
                        <span>Schedule Session</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'payments' ? 'bg-yoga-sage-50 text-yoga-sage-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <CreditCard size={20} />
                        <span>Payments</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'feedback' ? 'bg-yoga-sage-50 text-yoga-sage-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <MessageSquare size={20} />
                        <span>Feedback</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20 px-4 py-3 flex justify-between items-center">
                <span className="font-display font-bold text-lg">Anytime Yoga</span>
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow lg:ml-64 p-6 pt-20 lg:pt-6">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                            {activeTab.replace('-', ' ')}
                        </h1>
                        <p className="text-gray-500">Welcome back, {user?.name}!</p>
                    </div>

                    {renderContent()}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 flex justify-around p-2">
                <button onClick={() => setActiveTab('overview')} className={`p-2 rounded-lg flex flex-col items-center ${activeTab === 'overview' ? 'text-yoga-sage-600' : 'text-gray-400'}`}>
                    <LayoutDashboard size={20} />
                    <span className="text-[10px] mt-1">Home</span>
                </button>
                <button onClick={() => setActiveTab('schedule')} className={`p-2 rounded-lg flex flex-col items-center ${activeTab === 'schedule' ? 'text-yoga-sage-600' : 'text-gray-400'}`}>
                    <Calendar size={20} />
                    <span className="text-[10px] mt-1">Schedule</span>
                </button>
                <button onClick={() => setActiveTab('payments')} className={`p-2 rounded-lg flex flex-col items-center ${activeTab === 'payments' ? 'text-yoga-sage-600' : 'text-gray-400'}`}>
                    <CreditCard size={20} />
                    <span className="text-[10px] mt-1">Pay</span>
                </button>
                <button onClick={() => setActiveTab('feedback')} className={`p-2 rounded-lg flex flex-col items-center ${activeTab === 'feedback' ? 'text-yoga-sage-600' : 'text-gray-400'}`}>
                    <MessageSquare size={20} />
                    <span className="text-[10px] mt-1">Feedback</span>
                </button>
            </div>
        </div>
    )
}

export default Dashboard
