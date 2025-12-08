import React from 'react'

const TestTeacherData = () => {
    const allTeachers = [
        { id: 'TCH001', name: 'Emma Wilson', email: 'emma@anytimeyoga.com', specialization: ['Vinyasa', 'Hatha'], phone: '+91 98765 43210', totalSessions: 45, rating: 4.8, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
        { id: 'TCH002', name: 'David Lee', email: 'david@anytimeyoga.com', specialization: ['Power Yoga', 'Yin'], phone: '+91 98765 43211', totalSessions: 32, rating: 4.6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
        { id: 'TCH003', name: 'Sophie Martinez', email: 'sophie@anytimeyoga.com', specialization: ['Kundalini', 'Meditation'], phone: '+91 98765 43212', totalSessions: 0, rating: 0, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
        {
            id: 'TCH006',
            name: 'Abhay Pandey',
            email: 'abhaypandey567@gmail.com',
            phone: '+91 745 485 0412',
            specialization: ['Life Coaching', 'Counseling', 'Hatha', 'Vinyasa', 'Restorative', 'Meditation'],
            totalSessions: 0,
            rating: 0,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
            title: 'Life Coach (Guide and Therapeutic Counselor for Young Adults)'
        },
        { id: 'TCH007', name: 'Priya Sharma', email: 'priya.sharma@anytimeyoga.com', specialization: ['Vinyasa', 'Power Yoga'], phone: '+91 98765 43210', totalSessions: 245, rating: 4.9, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
        { id: 'TCH008', name: 'Teacher Demo', email: 'teacher@anytimeyoga.com', specialization: ['All Styles'], phone: '+91 98765 43213', totalSessions: 100, rating: 4.7, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }
    ]

    const abhay = allTeachers.find(t => t.email === 'abhaypandey567@gmail.com')

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Teacher Data Test</h1>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">All Teachers ({allTeachers.length})</h2>
                {allTeachers.map(t => (
                    <div key={t.id} className="p-3 border-b">
                        <strong>{t.name}</strong> - {t.email}
                    </div>
                ))}
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded">
                <h2 className="text-xl font-bold mb-2">Abhay Pandey Data:</h2>
                {abhay ? (
                    <pre className="text-sm">{JSON.stringify(abhay, null, 2)}</pre>
                ) : (
                    <p className="text-red-600">NOT FOUND!</p>
                )}
            </div>
        </div>
    )
}

export default TestTeacherData
