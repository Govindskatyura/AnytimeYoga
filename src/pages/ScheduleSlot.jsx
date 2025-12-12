import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, X } from 'lucide-react'
import Header from '../layouts/Header'
import DatePicker from '../components/booking/DatePicker'
import TimeSlots from '../components/booking/TimeSlots'
import BookingSummary from '../components/booking/BookingSummary'
import Button from '../components/ui/Button'

import { api } from '../services/api'

const ScheduleSlot = () => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedYogaType, setSelectedYogaType] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const navigate = useNavigate()

    // Mock Data Fallback (in case backend is down)
    const MOCK_TEACHERS = [
        {
            id: 'TCH006',
            name: 'Abhay Pandey',
            email: 'abhaypandey567@gmail.com',
            phone: '+91 745 485 0412',
            specialization: ['Life Coaching', 'Counseling', 'Hatha', 'Vinyasa', 'Restorative', 'Meditation'],
            totalSessions: 25,
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
            title: 'Life Coach'
        },
        {
            id: 'TCH001',
            name: 'Emma Wilson',
            email: 'emma@anytimeyoga.com',
            title: 'Vinyasa & Hatha Specialist',
            specialization: ['Vinyasa', 'Hatha'],
            phone: '+91 98765 43210',
            totalSessions: 45,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 'TCH002',
            name: 'David Lee',
            email: 'david@anytimeyoga.com',
            specialization: ['Power Yoga', 'Yin'],
            phone: '+91 98765 43211',
            totalSessions: 32,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 'TCH003',
            name: 'Sophie Martinez',
            email: 'sophie@anytimeyoga.com',
            specialization: ['Kundalini', 'Meditation'],
            phone: '+91 98765 43212',
            totalSessions: 0,
            rating: 0,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 'TCH007',
            name: 'Priya Sharma',
            email: 'priya.sharma@anytimeyoga.com',
            title: 'Power Yoga Expert',
            specialization: ['Vinyasa', 'Power Yoga'],
            phone: '+91 98765 43210',
            totalSessions: 245,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 'TCH008',
            name: 'Teacher Demo',
            email: 'teacher@anytimeyoga.com',
            specialization: ['All Styles'],
            phone: '+91 98765 43213',
            totalSessions: 100,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
        }
    ]

    useEffect(() => {
        window.scrollTo(0, 0)

        // Fetch teachers
        const fetchTeachers = async () => {
            try {
                setLoading(true)
                const data = await api.getTeachers()
                // Use mock if API returns empty array (rare but possible if DB empty)
                if (data && data.length > 0) {
                    setTeachers(data)
                } else {
                    console.warn('API returned empty, using mock data')
                    setTeachers(MOCK_TEACHERS)
                }
                setError(null)
            } catch (error) {
                console.error('Failed to fetch teachers, using fallback:', error)
                // Fallback to Mock Data
                setTeachers(MOCK_TEACHERS)
                setError(null) // Clear error to show data
            } finally {
                setLoading(false)
            }
        }
        fetchTeachers()
    }, [])

    const yogaTypes = [
        'Vinyasa',
        'Hatha',
        'Yin',
        'Kundalini',
        'Power Yoga',
        'Meditation'
    ]

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedTime || !selectedYogaType || !selectedTeacher) {
            alert("Please select all options")
            return
        }

        const bookingId = 'BK' + Date.now()
        // Navigate to payment page with booking details
        navigate(`/payment/${bookingId}`, {
            state: {
                booking: {
                    id: bookingId,
                    date: selectedDate,
                    time: selectedTime.time,
                    yogaType: selectedYogaType,
                    instructor: selectedTeacher.name,
                    instructorId: selectedTeacher.id,
                    duration: '60 min',
                    price: 25 // Could fetch this from teacher rate later
                }
            }
        })
    }

    const handleViewBookings = () => {
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/login-background.png"
                    alt="Chakra Meditation by Ocean"
                    className="w-full h-full object-cover fixed"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white/95"></div>
            </div>

            <div className="relative z-10">
                <Header />

                {/* Hero Section */}
                <section className="relative py-16 pt-24">
                    <div className="container-custom text-center">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                            Schedule Your Practice
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Choose your perfect time and style. We'll notify you once your instructor approves.
                        </p>
                    </div>
                </section>

                {/* Booking Section */}
                <section className="py-12 -mt-8">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Step 1: Date Selection */}
                                <div>
                                    <div className="mb-4">
                                        <span className="inline-block bg-yoga-sage-100 text-yoga-sage-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                                            Step 1
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900">Select Date</h3>
                                    </div>
                                    <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                                </div>

                                {/* Step 2: Time Selection */}
                                <div>
                                    <div className="mb-4">
                                        <span className="inline-block bg-yoga-lavender-100 text-yoga-lavender-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                                            Step 2
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900">Choose Time Slot</h3>
                                    </div>
                                    <TimeSlots
                                        selectedDate={selectedDate}
                                        selectedTime={selectedTime}
                                        onTimeSelect={setSelectedTime}
                                    />
                                </div>

                                {/* Step 3: Yoga Type Selection */}
                                <div>
                                    <div className="mb-4">
                                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                                            Step 3
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900">Select Yoga Type</h3>
                                    </div>
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {yogaTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setSelectedYogaType(type)}
                                                    className={`
                          p-4 rounded-xl border-2 font-medium transition-all text-center
                          ${selectedYogaType === type
                                                            ? 'border-yoga-sage-500 bg-yoga-sage-50 text-yoga-sage-700'
                                                            : 'border-gray-200 hover:border-yoga-sage-300 hover:bg-gray-50 text-gray-700'
                                                        }
                        `}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: Teacher Selection */}
                                <div>
                                    <div className="mb-4">
                                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                                            Step 4
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-900">Select Teacher</h3>
                                    </div>
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        {loading ? (
                                            <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                                                <div className="w-8 h-8 border-4 border-yoga-sage-200 border-t-yoga-sage-500 rounded-full animate-spin mb-2"></div>
                                                <p>Loading teachers...</p>
                                            </div>
                                        ) : error ? (
                                            <div className="text-center py-8">
                                                <p className="text-red-500 mb-2">{error}</p>
                                                <button
                                                    onClick={() => window.location.reload()}
                                                    className="text-sm text-yoga-sage-600 underline font-medium"
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        ) : teachers.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {teachers.map((teacher) => (
                                                    <button
                                                        key={teacher.id}
                                                        onClick={() => setSelectedTeacher(teacher)}
                                                        className={`
                                                            p-4 rounded-xl border-2 text-left transition-all flex items-center space-x-3
                                                            ${selectedTeacher?.id === teacher.id
                                                                ? 'border-yoga-sage-500 bg-yoga-sage-50'
                                                                : 'border-gray-200 hover:border-yoga-sage-300 hover:bg-gray-50'
                                                            }
                                                        `}
                                                    >
                                                        <img
                                                            src={teacher.image || 'https://via.placeholder.com/150'}
                                                            alt={teacher.name}
                                                            className="w-12 h-12 rounded-full object-cover bg-gray-200"
                                                        />
                                                        <div>
                                                            <p className={`font-bold ${selectedTeacher?.id === teacher.id ? 'text-yoga-sage-900' : 'text-gray-900'}`}>
                                                                {teacher.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 line-clamp-1">
                                                                {Array.isArray(teacher.specialization) ? teacher.specialization.join(', ') : teacher.specialization}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-gray-500">
                                                No teachers available at the moment.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Summary */}
                            <div className="lg:col-span-1">
                                <BookingSummary
                                    selectedDate={selectedDate}
                                    selectedTime={selectedTime}
                                    selectedYogaType={selectedYogaType}
                                    selectedTeacher={selectedTeacher}
                                    onConfirm={handleConfirmBooking}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-slide-up relative">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Submitted!</h3>
                                <p className="text-gray-600">
                                    Your session request is now <span className="font-bold text-orange-600">Pending Approval</span>
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
                                <p className="mb-2">
                                    ✉️ You'll receive an email notification once <span className="font-medium">{selectedTime?.instructor}</span> approves your booking.
                                </p>
                                <p>
                                    ⏱️ This usually takes less than 2 hours during business hours.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full justify-center" onClick={handleViewBookings}>
                                    View My Bookings
                                </Button>
                                <button
                                    onClick={() => {
                                        setShowConfirmation(false)
                                        setSelectedDate(null)
                                        setSelectedTime(null)
                                        setSelectedYogaType('')
                                    }}
                                    className="w-full py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    Book Another Session
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ScheduleSlot
