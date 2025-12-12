import React from 'react'
import { CheckCircle, User, Calendar, Clock, Activity } from 'lucide-react'
import Button from '../ui/Button'

const ApprovedSessions = ({ sessions, onMarkCompleted }) => {
    if (sessions.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500">No approved sessions</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {sessions.map((session) => (
                <div key={session._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{session.userName}</h3>
                                    <p className="text-sm text-gray-500">{session.userEmail}</p>
                                </div>
                                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    Approved
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Session Type</p>
                                    <div className="flex items-center space-x-1">
                                        <Activity size={14} className="text-orange-600" />
                                        <p className="font-medium text-gray-900 text-sm">{session.yogaType}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Date</p>
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} className="text-blue-600" />
                                        <p className="font-medium text-gray-900 text-sm">{new Date(session.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Time</p>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={14} className="text-purple-600" />
                                        <p className="font-medium text-gray-900 text-sm">{session.time} ({session.duration})</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <Button
                            onClick={() => onMarkCompleted(session._id)}
                            className="w-full justify-center bg-yoga-sage-600 hover:bg-yoga-sage-700"
                        >
                            <CheckCircle size={18} className="mr-2" />
                            Mark as Completed
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ApprovedSessions
