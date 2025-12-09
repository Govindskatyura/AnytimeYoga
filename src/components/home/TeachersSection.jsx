import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const teachers = [
    {
        id: 'TCH006',
        name: 'Abhay Pandey',
        title: 'Life Coach & Therapeutic Counselor',
        specialization: ['Life Coaching', 'Counseling', 'Hatha', 'Vinyasa', 'Restorative', 'Meditation'],
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
        rating: 5.0,
        sessions: '25+',
        bio: 'Specialized in helping young adults through evidence-based therapy combined with yoga and mindfulness practices.',
        expertise: ['Addiction Counseling', 'CBT', 'Trauma-Informed Care']
    },
    {
        id: 'TCH001',
        name: 'Emma Wilson',
        title: 'Vinyasa & Hatha Specialist',
        specialization: ['Vinyasa', 'Hatha'],
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
        rating: 4.8,
        sessions: '45+',
        bio: 'Expert in flowing sequences that build strength and flexibility while maintaining mindful breathing.',
        expertise: ['Vinyasa Flow', 'Hatha Yoga', 'Meditation']
    },
    {
        id: 'TCH007',
        name: 'Priya Sharma',
        title: 'Power Yoga Expert',
        specialization: ['Vinyasa', 'Power Yoga'],
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
        rating: 4.9,
        sessions: '245+',
        bio: 'Dynamic instructor focusing on building strength, endurance, and inner peace through powerful practice.',
        expertise: ['Power Yoga', 'Advanced Asanas', 'Strength Building']
    }
]

const TeachersSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container-custom">
                <SectionTitle
                    title="Meet Our Expert Teachers"
                    subtitle="Learn from the Best"
                    description="Our certified yoga instructors bring years of experience and deep knowledge to guide you on your wellness journey"
                />

                {/* Teachers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 p-8 text-center"
                        >
                            {/* Circular Teacher Image */}
                            <div className="relative inline-block mb-6">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-yoga-sage-100 to-yoga-lavender-100 border-4 border-white shadow-xl">
                                    <img
                                        src={teacher.image}
                                        alt={teacher.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                {/* Rating Badge - Bottom Right */}
                                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg border-2 border-white">
                                    <Star size={14} className="fill-white text-white" />
                                    <span className="text-sm font-bold text-white">{teacher.rating}</span>
                                </div>
                            </div>

                            {/* Teacher Info */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                                <p className="text-sm text-yoga-sage-600 font-semibold mb-4">{teacher.title}</p>

                                {/* Bio */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 px-4">
                                    {teacher.bio}
                                </p>

                                {/* Specializations */}
                                <div className="flex flex-wrap gap-2 justify-center mb-6">
                                    {teacher.specialization.slice(0, 3).map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-gradient-to-r from-yoga-sage-50 to-yoga-lavender-50 text-yoga-sage-700 text-xs rounded-full font-semibold border border-yoga-sage-200"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats & Action */}
                                <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-100">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-yoga-sage-600">{teacher.sessions}</p>
                                        <p className="text-xs text-gray-500 font-medium">Sessions</p>
                                    </div>
                                    <div className="h-10 w-px bg-gray-200"></div>
                                    <Link
                                        to={`/teacher/${teacher.id}`}
                                        className="px-6 py-2.5 bg-gradient-to-r from-yoga-sage-500 to-yoga-lavender-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <span>View Profile</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Teachers Link */}
                <div className="text-center mt-12">
                    <Link
                        to="/teachers"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-yoga-sage-500 to-yoga-lavender-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        <span>View All Teachers</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TeachersSection
