import React from 'react'
import { Play, Clock, BarChart, Heart } from 'lucide-react'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const videos = [
    {
        id: 1,
        title: "Morning Flow for Energy",
        duration: "20 min",
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop",
        instructor: "Emma Wilson",
        category: "Vinyasa"
    },
    {
        id: 2,
        title: "Deep Relaxation & Sleep",
        duration: "45 min",
        level: "All Levels",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
        instructor: "Abhay Pandey",
        category: "Meditation"
    },
    {
        id: 3,
        title: "Core Strength Power Yoga",
        duration: "30 min",
        level: "Intermediate",
        thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
        instructor: "Priya Sharma",
        category: "Power Yoga"
    },
    {
        id: 4,
        title: "Stress Relief Breathwork",
        duration: "15 min",
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop",
        instructor: "David Lee",
        category: "Pranayama"
    },
    {
        id: 5,
        title: "Full Body Flexibility",
        duration: "60 min",
        level: "Intermediate",
        thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
        instructor: "Sophie Martinez",
        category: "Hatha"
    },
    {
        id: 6,
        title: "Office Yoga - Quick Stretch",
        duration: "10 min",
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop",
        instructor: "Emma Wilson",
        category: "Stretching"
    }
]

const YogaVideos = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[95vh] min-h-[800px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/harmony-hero.png"
                        alt="Harmony Yoga & Wellness"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Video Grid Section */}
            <div className="flex-grow container-custom py-20">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Classes</h2>
                        <p className="text-gray-600">Hand-picked sessions to help you get started</p>
                    </div>
                    <button className="hidden md:block text-yoga-sage-600 font-medium hover:text-yoga-sage-700 hover:underline">
                        View All Videos
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div key={video.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300">
                                        <Play size={24} className="text-yoga-sage-600 ml-1" fill="currentColor" />
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-xs font-medium text-white flex items-center gap-1">
                                    <Clock size={12} />
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-yoga-sage-600 uppercase tracking-wider bg-yoga-sage-50 px-2 py-1 rounded-md">
                                        {video.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                        <BarChart size={12} />
                                        {video.level}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yoga-sage-700 transition-colors line-clamp-2">
                                    {video.title}
                                </h3>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                            <img src={`https://ui-avatars.com/api/?name=${video.instructor}&background=random`} alt={video.instructor} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">{video.instructor}</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                        <Heart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="px-6 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full">
                        View All Videos
                    </button>
                </div>
            </div>

        </div>
    )
}

export default YogaVideos
