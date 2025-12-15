import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../layouts/Header'
import ComparisonSection from '../components/whyyoga/ComparisonSection'
import FitnessWellnessSection from '../components/home/FitnessWellnessSection'
import Button from '../components/ui/Button'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

const WhyYoga = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-purple-200 selection:text-purple-900">
            <Header />

            {/* Immersive Hero Section */}
            <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/why-yoga-hero.png"
                        alt="Meditation Mandala Energy"
                        className="w-full h-full object-cover scale-105 animate-[pulse-slow_12s_ease-in-out_infinite]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/20 to-black/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-black/40"></div>
                </div>

                <div className="container-custom relative z-10 text-center text-white px-6 mt-16">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-white mb-8 shadow-lg hover:bg-white/20 transition-all duration-300">
                        <Sparkles size={16} className="text-purple-300" />
                        <span className="text-sm font-semibold tracking-widest uppercase">Ancient Wisdom • Modern Life</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 animate-slide-up leading-tight drop-shadow-2xl">
                        The Science of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 filter drop-shadow-[0_4px_16px_rgba(168,85,247,0.4)]">
                            Serenity
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-purple-100/90 mb-12 animate-slide-up leading-relaxed font-light" style={{ animationDelay: '0.2s' }}>
                        Discover how the ancient practice of union transforms your physiology, psychology, and spiritual well-being.
                    </p>

                    <button
                        onClick={() => document.getElementById('discover').scrollIntoView({ behavior: 'smooth' })}
                        className="animate-slide-up inline-flex flex-col items-center text-white/50 hover:text-white transition-colors duration-300 group"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="text-sm uppercase tracking-widest mb-2 group-hover:tracking-[0.2em] transition-all">Discover More</span>
                        <ChevronDown size={32} className="animate-bounce" />
                    </button>
                </div>
            </section>

            <div id="discover">
                {/* Complete Harmony Section (Wellness) */}
                <FitnessWellnessSection />
            </div>

            {/* Daily Wellness / Quote Section */}
            <section className="py-24 bg-[#0f172a] text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full"></div>

                <div className="container-custom max-w-5xl relative z-10">
                    <div className="text-6xl md:text-8xl text-purple-800/20 font-serif absolute -top-12 left-0 select-none">"</div>
                    <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-8 relative z-10">
                        Yoga is not about touching your toes.<br />
                        It is about what you learn on the way down.
                    </h2>
                    <div className="inline-block border-t border-purple-500/30 pt-6 px-12">
                        <p className="text-purple-300 text-lg uppercase tracking-widest font-bold">— Jigar Gor</p>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <ComparisonSection />

            {/* Final CTA */}
            <section className="py-32 bg-gray-50 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
                <div className="container-custom max-w-4xl relative z-10">
                    <span className="text-purple-600 font-bold tracking-widest uppercase mb-4 block">Begin Today</span>
                    <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-8">Ready to find your balance?</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Join thousands of others who have made the choice for a healthier, happier life today.
                    </p>
                    <Link to="/free-trial">
                        <Button
                            size="large"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 px-10 py-5 rounded-full text-lg border-none"
                        >
                            <span className="flex items-center space-x-3">
                                <span>Start Your Free Trial</span>
                                <ArrowRight size={22} />
                            </span>
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default WhyYoga
