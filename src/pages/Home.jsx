import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import BenefitsSection from '../components/home/BenefitsSection'
import WhyYogaSection from '../components/home/WhyYogaSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import YogaTypesSection from '../components/home/YogaTypesSection'
import TeachersSection from '../components/home/TeachersSection'

const Home = () => {
    return (
        <div className="animate-fade-in">
            <HeroSection />
            <BenefitsSection />
            <YogaTypesSection />
            <TeachersSection />
            <WhyYogaSection />
            <TestimonialsSection />

            {/* Call to Action Banner - Spiritual Theme */}
            <section className="py-24 relative overflow-hidden group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2070&auto=format&fit=crop"
                        alt="Spiritual Yoga"
                        className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
                    />
                    {/* Dark Spiritual Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2a1b3d]/95 via-[#44315f]/80 to-[#2a1b3d]/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="container-custom px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-left mb-10 md:mb-0">
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight drop-shadow-xl">
                            Yoga is Not Just Exercise,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">It's a Way of Life</span>
                        </h2>
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl font-light">
                            Beyond the physical postures lies a journey of self-discovery.
                            Yoga connects your breath to your movement, and your movement to your spirit.
                            It awakens the dormant energy within, bringing vitality, clarity, and a profound sense of aliveness.
                        </p>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center">
                                ✨ Spiritual Awakening
                            </span>
                            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center">
                                🌱 Vitality & Energy
                            </span>
                            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center">
                                🧘‍♀️ Inner Peace
                            </span>
                        </div>
                    </div>

                    <div className="md:w-1/3 text-center md:text-right">
                        <Link to="/free-trial">
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transform transition-all duration-300 text-lg border border-white/20">
                                Start Your Journey
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
