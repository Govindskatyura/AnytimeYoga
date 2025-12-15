import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search, Filter, Download, DollarSign, TrendingUp, Calendar, CheckCircle, Clock, XCircle, CreditCard } from 'lucide-react'
import { api } from '../../services/api'
import cosmicBg from '../../assets/images/cosmic-bg.png'

const PaymentHistory = () => {
    const navigate = useNavigate()
    const [payments, setPayments] = useState([])
    const [filteredPayments, setFilteredPayments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [stats, setStats] = useState({
        totalRevenue: 0,
        successfulPayments: 0,
        pendingPayments: 0,
        failedPayments: 0
    })

    useEffect(() => {
        window.scrollTo(0, 0)

        const auth = JSON.parse(localStorage.getItem('adminAuth'))
        if (!auth || (auth.role !== 'admin' && !auth.isAdmin)) {
            navigate('/login')
            return
        }

        const fetchPayments = async () => {
            try {
                // Fetch bookings and derive payment data
                const bookings = await api.getBookings(auth.token)

                // Transform bookings into payment records
                const paymentData = bookings.map(booking => ({
                    id: booking._id,
                    transactionId: booking.paymentId || `TXN${booking._id?.slice(-8)}`,
                    userName: booking.userName,
                    userEmail: booking.userEmail,
                    teacherName: booking.teacherName,
                    amount: booking.amount,
                    date: booking.createdAt || booking.date,
                    status: booking.status === 'Completed' ? 'Success' :
                        booking.status === 'Confirmed' ? 'Success' :
                            booking.status === 'Cancelled' ? 'Failed' : 'Pending',
                    yogaType: booking.yogaType,
                    bookingDate: booking.date,
                    bookingTime: booking.time
                }))

                setPayments(paymentData)
                setFilteredPayments(paymentData)

                // Calculate stats
                const totalRevenue = paymentData
                    .filter(p => p.status === 'Success')
                    .reduce((acc, p) => acc + parseInt(p.amount || 0), 0)

                const successfulPayments = paymentData.filter(p => p.status === 'Success').length
                const pendingPayments = paymentData.filter(p => p.status === 'Pending').length
                const failedPayments = paymentData.filter(p => p.status === 'Failed').length

                setStats({
                    totalRevenue,
                    successfulPayments,
                    pendingPayments,
                    failedPayments
                })
            } catch (error) {
                console.error('Failed to fetch payment history:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPayments()
    }, [navigate])

    useEffect(() => {
        let filtered = payments

        // Filter by status
        if (filterStatus !== 'all') {
            filtered = filtered.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase())
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredPayments(filtered)
    }, [searchTerm, filterStatus, payments])

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/20">
                        <CheckCircle size={12} />
                        <span>Success</span>
                    </span>
                )
            case 'pending':
                return (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/20">
                        <Clock size={12} />
                        <span>Pending</span>
                    </span>
                )
            case 'failed':
                return (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/20">
                        <XCircle size={12} />
                        <span>Failed</span>
                    </span>
                )
            default:
                return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-300">{status}</span>
        }
    }

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

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Navbar */}
                <header className="bg-gray-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-display font-bold text-white">Payment History</h1>
                    </div>
                </header>

                <div className="p-6 md:p-10 flex-1">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                                label: 'Successful',
                                value: stats.successfulPayments,
                                icon: CheckCircle,
                                color: 'text-green-400',
                                bg: 'bg-green-400/10',
                                border: 'border-green-400/20'
                            },
                            {
                                label: 'Pending',
                                value: stats.pendingPayments,
                                icon: Clock,
                                color: 'text-orange-400',
                                bg: 'bg-orange-400/10',
                                border: 'border-orange-400/20'
                            },
                            {
                                label: 'Failed',
                                value: stats.failedPayments,
                                icon: XCircle,
                                color: 'text-red-400',
                                bg: 'bg-red-400/10',
                                border: 'border-red-400/20'
                            }
                        ].map((stat, idx) => (
                            <div key={idx} className={`bg-white/5 backdrop-blur-xl border ${stat.border} rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-300 shadow-lg`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                                        <stat.icon className={stat.color} size={24} />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6 shadow-xl">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 w-full md:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or transaction ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500 transition-all"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center space-x-2 bg-black/20 p-1 rounded-xl border border-white/5">
                                {['all', 'success', 'pending', 'failed'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${filterStatus === status
                                                ? 'bg-yoga-sage-500 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Table */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Teacher</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredPayments.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                                No payment records found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredPayments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <CreditCard size={16} className="text-yoga-sage-400" />
                                                        <span className="text-sm font-mono text-white">{payment.transactionId}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-white">{payment.userName}</div>
                                                        <div className="text-xs text-gray-400">{payment.userEmail}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-300">{payment.teacherName}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm text-white">{payment.yogaType}</div>
                                                        <div className="text-xs text-gray-400">
                                                            {new Date(payment.bookingDate).toLocaleDateString()} at {payment.bookingTime}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-emerald-400 font-display">
                                                        {formatCurrency(payment.amount)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-300">
                                                        {new Date(payment.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(payment.status)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory
