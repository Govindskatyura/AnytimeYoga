import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { ArrowRight, Play, Star } from 'lucide-react'

const HeroSection = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Full Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover object-center"
                >
                    <source src="/hero-banner-video.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    <img
                        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
                        alt="Serene Yoga Background"
                        className="w-full h-full object-cover object-center"
                    />
                </video>
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 pt-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-2xl"> {/* Content on left */}
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm mb-8 animate-fade-in">
                        <span className="flex items-center text-yellow-400">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                        </span>
                        <span className="text-sm font-medium text-white">#1 Rated Yoga Platform</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-tight text-white mb-6 animate-slide-up">
                        Find Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoga-sage-300 to-yoga-lavender-300">Inner Peace</span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Transform your body and mind with flexible yoga sessions designed for your busy lifestyle.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link to="/free-trial">
                            <Button size="large" className="w-full sm:w-auto shadow-xl shadow-yoga-sage-900/50 hover:shadow-2xl hover:shadow-yoga-sage-800/50 transition-all duration-500 border border-white/10">
                                <span className="flex items-center space-x-2">
                                    <span>Start Free Trial</span>
                                    <ArrowRight size={20} />
                                </span>
                            </Button>
                        </Link>

                        <Link to="/watch-demo" className="w-full sm:w-auto">
                            <button className="flex items-center space-x-4 group w-full sm:w-auto">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/20">
                                    <Play size={20} fill="currentColor" className="ml-1" />
                                </div>
                                <span className="text-white font-semibold text-lg group-hover:text-yoga-sage-200 transition-colors">Watch Demo</span>
                            </button>
                        </Link>
                    </div>

                    {/* Stats / Social Proof */}
                    <div className="mt-16 flex items-center space-x-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="flex -space-x-4">
                            {[
                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                            ].map((src, i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-gray-800 overflow-hidden">
                                    <img src={src} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-gray-800 bg-yoga-sage-600 flex items-center justify-center text-white font-bold text-xs">
                                2k+
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-bold">Join our community</p>
                            <p className="text-gray-400 text-sm">Start your journey today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Glass Card (Decorative) */}
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 hidden lg:block animate-float">
                <div className="glass-effect p-6 rounded-2xl max-w-xs bg-black/40 border-white/10 backdrop-blur-xl">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-yoga-peach-500/20 rounded-full flex items-center justify-center text-yoga-peach-400">
                            <Star fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Daily Inspiration</p>
                            <p className="font-bold text-white">"Peace comes from within."</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-yoga-peach-400 to-yoga-lavender-400"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
