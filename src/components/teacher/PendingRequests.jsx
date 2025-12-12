import React from 'react'
import { CheckCircle, XCircle, User, Calendar, Clock, Activity } from 'lucide-react'
import Button from '../ui/Button'

const PendingRequests = ({ requests, onApprove, onReject }) => {
    if (requests.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500">No pending requests</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {requests.map((request) => (
                <div key={request._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-10 h-10 bg-yoga-sage-100 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-yoga-sage-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{request.userName}</h3>
                                    <p className="text-sm text-gray-500">{request.userEmail}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Session Type</p>
                                    <div className="flex items-center space-x-1">
                                        <Activity size={14} className="text-orange-600" />
                                        <p className="font-medium text-gray-900 text-sm">{request.yogaType}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Date</p>
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} className="text-blue-600" />
                                        <p className="font-medium text-gray-900 text-sm">{new Date(request.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Time</p>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={14} className="text-purple-600" />
                                        <p className="font-medium text-gray-900 text-sm">{request.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                        <Button
                            onClick={() => onApprove(request._id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 justify-center"
                        >
                            <CheckCircle size={18} className="mr-2" />
                            Accept
                        </Button>
                        <button
                            onClick={() => onReject(request._id)}
                            className="flex-1 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center"
                        >
                            <XCircle size={18} className="mr-2" />
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PendingRequests
