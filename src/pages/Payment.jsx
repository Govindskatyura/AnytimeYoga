import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Calendar, Clock, User, Activity } from 'lucide-react'
import Header from '../layouts/Header'
import PaymentForm from '../components/payment/PaymentForm'
import { api } from '../services/api'

const Payment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [bookingData, setBookingData] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        // Get booking data from location state or use mock data
        const data = location.state?.booking || {
            id: 'BK' + Date.now(),
            date: new Date(2023, 11, 15),
            time: '07:00 AM',
            yogaType: 'Vinyasa',
            instructor: 'Emma Wilson',
            duration: '60 min',
            price: 25
        }
        setBookingData(data)
    }, [location])

    const handlePaymentComplete = async (paymentDetails) => {
        try {
            // Get user token
            const userAuth = JSON.parse(localStorage.getItem('userAuth'))

            if (!userAuth || !userAuth.token) {
                alert('Please login to complete booking')
                navigate('/login')
                return
            }

            const bookingPayload = {
                teacherId: bookingData.instructorId || 'TCH001', // Should come from generic teacher unless specific
                teacherName: bookingData.instructor,
                date: bookingData.date,
                time: bookingData.time,
                yogaType: bookingData.yogaType,
                amount: bookingData.price,
                paymentId: paymentDetails.id || 'PAY' + Date.now()
            }

            await api.createBooking(bookingPayload, userAuth.token)

            // Navigate to invoice with booking and payment details
            navigate('/invoice/' + Date.now(), {
                state: {
                    booking: bookingData,
                    payment: paymentDetails,
                    invoiceNumber: 'INV-' + Date.now(),
                    invoiceDate: new Date().toISOString()
                }
            })
        } catch (error) {
            console.error('Booking creation failed:', error)
            alert('Failed to process booking. Please try again.')
        }
    }

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-sage-600"></div>
            </div>
        )
    }

    const platformFee = 2
    const totalAmount = bookingData.price + platformFee

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-yoga-lavender-100 via-yoga-sage-50 to-white py-16 pt-24">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Complete Your Payment
                    </h1>
                    <p className="text-lg text-gray-600">
                        You're one step away from your yoga session
                    </p>
                </div>
            </section>

            {/* Payment Section */}
            <section className="py-12 -mt-8">
                <div className="container-custom max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Session Details */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Session Details</h3>

                                <div className="space-y-4">
                                    {/* Date */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-yoga-sage-100 rounded-lg flex items-center justify-center text-yoga-sage-600 flex-shrink-0">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Date</p>
                                            <p className="font-bold text-gray-900 text-sm">{formatDate(bookingData.date)}</p>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-yoga-lavender-100 rounded-lg flex items-center justify-center text-yoga-lavender-600 flex-shrink-0">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Time</p>
                                            <p className="font-bold text-gray-900 text-sm">{bookingData.time}</p>
                                            <p className="text-xs text-gray-500">{bookingData.duration}</p>
                                        </div>
                                    </div>

                                    {/* Instructor */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Instructor</p>
                                            <p className="font-bold text-gray-900 text-sm">{bookingData.instructor}</p>
                                        </div>
                                    </div>

                                    {/* Yoga Type */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                                            <Activity size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Yoga Type</p>
                                            <p className="font-bold text-gray-900 text-sm">{bookingData.yogaType}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Session Fee</span>
                                        <span>${bookingData.price}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Platform Fee</span>
                                        <span>${platformFee}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>${totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment Form */}
                        <div className="lg:col-span-2">
                            <PaymentForm amount={totalAmount} onPaymentComplete={handlePaymentComplete} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Payment
