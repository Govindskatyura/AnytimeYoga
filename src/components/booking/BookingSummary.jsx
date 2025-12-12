import React from 'react'
import { Calendar, Clock, Activity, User, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const BookingSummary = ({ selectedDate, selectedTime, selectedYogaType, selectedTeacher, onConfirm }) => {
    const isComplete = selectedDate && selectedTime && selectedYogaType && selectedTeacher

    const formatDate = (date) => {
        if (!date) return ''
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

            <div className="space-y-4 mb-6">
                {/* Date */}
                <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedDate ? 'bg-yoga-sage-100 text-yoga-sage-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Calendar size={20} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-gray-500 font-medium mb-1">Date</p>
                        <p className={`font-bold ${selectedDate ? 'text-gray-900' : 'text-gray-400'}`}>
                            {selectedDate ? formatDate(selectedDate) : 'Not selected'}
                        </p>
                    </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedTime ? 'bg-yoga-lavender-100 text-yoga-lavender-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Clock size={20} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-gray-500 font-medium mb-1">Time</p>
                        <p className={`font-bold ${selectedTime ? 'text-gray-900' : 'text-gray-400'}`}>
                            {selectedTime ? selectedTime.time : 'Not selected'}
                        </p>
                    </div>
                </div>

                {/* Yoga Type */}
                <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedYogaType ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Activity size={20} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-gray-500 font-medium mb-1">Yoga Type</p>
                        <p className={`font-bold ${selectedYogaType ? 'text-gray-900' : 'text-gray-400'}`}>
                            {selectedYogaType || 'Not selected'}
                        </p>
                    </div>
                </div>

                {/* Teacher */}
                <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedTeacher ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                        <User size={20} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-gray-500 font-medium mb-1">Instructor</p>
                        <p className={`font-bold ${selectedTeacher ? 'text-gray-900' : 'text-gray-400'}`}>
                            {selectedTeacher ? selectedTeacher.name : 'Not selected'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Session Fee</span>
                    <span className="text-2xl font-bold text-gray-900">$25</span>
                </div>
            </div>

            <Button
                className="w-full justify-center"
                onClick={onConfirm}
                disabled={!isComplete}
            >
                <span className="flex items-center space-x-2">
                    <span>Proceed to Payment</span>
                    <ArrowRight size={18} />
                </span>
            </Button>

            {!isComplete && (
                <p className="text-xs text-gray-500 text-center mt-3">
                    Please complete all selections
                </p>
            )}
        </div>
    )
}

export default BookingSummary
