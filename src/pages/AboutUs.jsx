import React, { useEffect } from 'react'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import MissionVision from '../components/about/MissionVision'
import PhilosophySection from '../components/about/PhilosophySection'
import { Activity, Globe, Heart, Sparkles, User, ChevronDown, Feather } from 'lucide-react'

const AboutUs = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-white selection:bg-teal-200 selection:text-teal-900">
            <Header />

            {/* Immersive Sanctuary Hero */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=2000&auto=format&fit=crop"
                        alt="Yoga Sanctuary Nature"
                        className="w-full h-full object-cover scale-110 animate-[pulse-slow_15s_ease-in-out_infinite]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-teal-900/20 to-black/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f0fdf4] via-transparent to-black/30"></div>
                </div>

                <div className="container-custom relative z-10 text-center px-6 mt-10">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-5 py-2 text-white mb-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <Feather size={16} className="text-teal-100" />
                        <span className="text-sm font-semibold tracking-[0.2em] uppercase">Est. 2024 • Global</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 animate-slide-up leading-[1.1] text-white drop-shadow-2xl">
                        Not Just A Studio. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-200 to-green-200 filter drop-shadow-[0_4px_16px_rgba(20,184,166,0.5)]">
                            A Sanctuary.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-teal-50/90 mb-16 animate-slide-up leading-relaxed font-light font-serif italic" style={{ animationDelay: '0.2s' }}>
                        "Connecting you to your highest self, anywhere, anytime."
                    </p>

                    <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent mx-auto"></div>
                    </div>
                </div>
            </section>

            {/* Our Story - Magazine Style Layout */}
            <section className="py-32 bg-[#f0fdf4] relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <span className="text-teal-600 font-bold tracking-[0.2em] uppercase text-sm mb-6 block relative pl-12 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-8 before:h-px before:bg-teal-600">
                                Our Origin Story
                            </span>
                            <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-10 leading-tight">
                                From a Local Studio to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Global Movement</span>
                            </h2>
                            <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-light">
                                <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-teal-800">
                                    Anytime Yoga began with a simple observation in a crowded city studio: the people who needed yoga the most—the stressed executives, the busy parents, the overwhelmed students—were the ones who just couldn't make the 6 PM class.
                                </p>
                                <p>
                                    We realized that for wellness to be truly sustainable, it had to be accessible. It had to fit into the messy, beautiful, chaotic reality of modern life, not compete with it.
                                </p>
                                <div className="bg-white/60 p-8 rounded-2xl border-l-4 border-teal-500 italic text-gray-800 shadow-sm">
                                    "We closed our physical doors to open a digital window. We gathered the world's most compassionate teachers and built a platform that brings the sanctity of the studio directly into your living room."
                                </div>
                            </div>
                        </div>

                        {/* Image Collage */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative z-10 grid grid-cols-2 gap-6">
                                <img
                                    src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=2072&auto=format&fit=crop"
                                    alt="Home Practice"
                                    className="rounded-[2rem] shadow-2xl w-full h-80 object-cover transform translate-y-12 hover:scale-105 transition-transform duration-700"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
                                    alt="Outdoor Yoga"
                                    className="rounded-[2rem] shadow-2xl w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Decorative Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl z-20 animate-float">
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-teal-600">50+</span>
                                    <span className="text-xs uppercase tracking-wide text-gray-500">Countries</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <MissionVision />

            {/* What Makes Us Different - Dark Glass Section */}
            <section className="py-32 bg-[#0f172a] text-white relative overflow-hidden group">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-emerald-900/20 to-black opacity-50 group-hover:scale-105 transition-transform duration-[3s]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-teal-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block animate-pulse">Our Differentiator</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Why We Are Different</h2>
                        <p className="text-gray-400 text-xl font-light">
                            We aren't just another fitness app. We are a holistic ecosystem designed to support your entire well-being.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 group/card hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-teal-500/10 rounded-2xl flex items-center justify-center mb-8 text-teal-300 group-hover/card:scale-110 transition-transform shadow-[0_0_20px_rgba(45,212,191,0.1)]">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Live Correction</h3>
                            <p className="text-gray-400 leading-relaxed group-hover/card:text-gray-300 transition-colors">
                                Unlike static videos, our interactive sessions offer real-time feedback cues to ensure your alignment is safe and effective.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group/card hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-300 group-hover/card:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Holistic Approach</h3>
                            <p className="text-gray-400 leading-relaxed group-hover/card:text-gray-300 transition-colors">
                                We treat the whole person. Our library integrates physical asana, breathwork, meditation, and nutritional guidance.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group/card hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center mb-8 text-orange-300 group-hover/card:scale-110 transition-transform shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Global Community</h3>
                            <p className="text-gray-400 leading-relaxed group-hover/card:text-gray-300 transition-colors">
                                Join a vibrant network of practitioners from over 50 countries. Share your journey, find accountability, and grow together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Teacher Philosophy */}
            <PhilosophySection />

            {/* <Footer /> */}
        </div>
    )
}

export default AboutUs
