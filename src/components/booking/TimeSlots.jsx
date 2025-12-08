import React from 'react'
import { Clock, User } from 'lucide-react'

const TimeSlots = ({ selectedDate, selectedTime, onTimeSelect }) => {
    // Mock time slots with availability
    const timeSlots = [
        { time: '07:00 AM', instructor: 'Abhay Pandey', available: true },
        { time: '07:00 AM', instructor: 'Emma Wilson', available: true },
        { time: '08:00 AM', instructor: 'David Chen', available: true },
        { time: '08:00 AM', instructor: 'Abhay Pandey', available: true },
        { time: '09:00 AM', instructor: 'Sarah Johnson', available: false },
        { time: '10:00 AM', instructor: 'Maya Devi', available: true },
        { time: '12:00 PM', instructor: 'David Chen', available: true },
        { time: '02:00 PM', instructor: 'Emma Wilson', available: false },
        { time: '04:00 PM', instructor: 'Sarah Johnson', available: true },
        { time: '06:00 PM', instructor: 'Abhay Pandey', available: true },
        { time: '06:00 PM', instructor: 'Maya Devi', available: true },
        { time: '07:00 PM', instructor: 'Abhay Pandey', available: true },
        { time: '08:00 PM', instructor: 'David Chen', available: true },
    ]

    if (!selectedDate) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center text-gray-400">
                    <Clock size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Please select a date first</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Available Time Slots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                    <button
                        key={slot.time}
                        onClick={() => slot.available && onTimeSelect(slot)}
                        disabled={!slot.available}
                        className={`
              p-4 rounded-xl border-2 text-left transition-all
              ${!slot.available ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' : ''}
              ${slot.available && selectedTime?.time !== slot.time ? 'border-gray-200 hover:border-yoga-sage-300 hover:bg-yoga-sage-50' : ''}
              ${selectedTime?.time === slot.time ? 'border-yoga-sage-500 bg-yoga-sage-50' : ''}
            `}
                    >
                        <div className="flex items-center space-x-2 mb-2">
                            <Clock size={16} className={selectedTime?.time === slot.time ? 'text-yoga-sage-600' : 'text-gray-500'} />
                            <span className={`font-bold ${selectedTime?.time === slot.time ? 'text-yoga-sage-700' : 'text-gray-900'}`}>
                                {slot.time}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User size={14} />
                            <span>{slot.instructor}</span>
                        </div>
                        {!slot.available && (
                            <span className="text-xs text-red-500 font-medium mt-2 block">Fully Booked</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TimeSlots
