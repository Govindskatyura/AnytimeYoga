import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../layouts/Header'
import YogaStyleSection from '../components/benefits/YogaStyleSection'
import FAQSection from '../components/benefits/FAQSection'
import Button from '../components/ui/Button'
import { ArrowRight, Sparkles, Star, ChevronDown } from 'lucide-react'

const FitnessBenefits = () => {
    const navigate = useNavigate()

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-indigo-200 selection:text-indigo-900">
            <Header />

            {/* Immersive Cosmic Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Parallax Background Layers */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/benefits-hero.jpg"
                        alt="Cosmic Meditation Energy"
                        className="w-full h-full object-cover scale-105 animate-[pulse-slow_10s_ease-in-out_infinite]"
                    />
                    {/* Gradient Overlays for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-indigo-900/40 to-black/80 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0f] via-transparent to-black/30"></div>
                </div>

                {/* Content Container */}
                <div className="container-custom relative z-10 text-center px-6 mt-10">

                    {/* Floating Badge */}
                    <div className="animate-float inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 text-white mb-10 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-colors duration-300 cursor-default">
                        <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                        <span className="text-sm font-semibold tracking-widest uppercase">Transcend The Ordinary</span>
                    </div>

                    {/* Main Title with Gradient and Drop Shadow */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 animate-slide-up leading-[1.1] tracking-tight drop-shadow-2xl">
                        Unlock Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 filter drop-shadow-[0_4px_24px_rgba(255,100,200,0.5)]">
                            Infinite Self
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-indigo-100/90 mb-14 animate-slide-up leading-relaxed font-light" style={{ animationDelay: '0.2s' }}>
                        More than just poses. Discover a spectrum of ancient practices designed to align your physical power with your spiritual essence.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Button
                            onClick={() => navigate('/register')}
                            size="large"
                            className="bg-white text-indigo-900 hover:bg-indigo-50 shadow-[0_0_40px_rgba(255,255,255,0.5)] border-none px-10 py-5 text-lg rounded-full hover:scale-105 transition-transform duration-300"
                        >
                            Start Your Journey
                        </Button>
                        <button
                            onClick={() => document.getElementById('styles').scrollIntoView({ behavior: 'smooth' })}
                            className="text-white/80 hover:text-white flex items-center space-x-2 font-medium transition-colors hover:underline decoration-white/30 underline-offset-8"
                        >
                            <span>Explore Styles</span>
                            <ChevronDown size={20} className="animate-bounce" />
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Introduction Quote */}
            <section className="py-32 text-center bg-[#0d0a0f] text-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
                <div className="container-custom max-w-4xl relative z-10">
                    <Star className="w-12 h-12 text-yellow-500/50 mx-auto mb-8 animate-spin-slow" />
                    <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        "Your body is the temple. Keep it pure and clean for the soul to reside in."
                    </h2>
                    <p className="text-lg text-gray-500 font-light tracking-wide uppercase">— B.K.S. Iyengar</p>
                </div>
            </section>

            <div id="styles">
                {/* Vinyasa / Power Yoga */}
                <YogaStyleSection
                    theme="orange"
                    title="Sweat, Burn & Detox"
                    subtitle="Vinyasa & Power Yoga"
                    description="A dynamic, high-energy practice where breath is linked with movement. Expect to move continuously, build internal heat, and challenge your cardiovascular system. This is yoga for those who want a workout."
                    benefits={[
                        "High Calorie Burn (400+ per hour)",
                        "Cardiovascular Health",
                        "Lean Muscle Definition",
                        "Detoxification through Sweat"
                    ]}
                    image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
                />

                {/* Yin / Restorative */}
                <YogaStyleSection
                    reverse={true}
                    theme="indigo"
                    title="Deep Release & Recovery"
                    subtitle="Yin & Restorative Yoga"
                    description="The perfect counterbalance to a busy life or intense workouts. Poses are held for 3-5 minutes to target deep connective tissues (fascia) rather than muscles. It's passive, meditative, and deeply healing."
                    benefits={[
                        "Increased Joint Mobility",
                        "Fascia Release & Flexibility",
                        "Injury Prevention & Recovery",
                        "Deep Nervous System Rest"
                    ]}
                    image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2031&auto=format&fit=crop"
                />

                {/* Hatha / Iyengar */}
                <YogaStyleSection
                    theme="sage"
                    title="Balance, Posture & Alignment"
                    subtitle="Hatha & Iyengar Yoga"
                    description="A slower-paced practice focused on proper alignment and holding poses for longer periods. It builds foundational strength and corrects postural imbalances caused by sitting at desks or driving."
                    benefits={[
                        "Correction of Poor Posture",
                        "Core Stability & Balance",
                        "Back Pain Relief",
                        "Mind-Body Connection"
                    ]}
                    image="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop"
                />

                {/* Kundalini Yoga */}
                <YogaStyleSection
                    reverse={true}
                    theme="gold"
                    title="Awaken Your Energy"
                    subtitle="Kundalini Yoga"
                    description="Known as the 'Yoga of Awareness', Kundalini combines dynamic movement, breathwork (Pranayama), meditation, and chanting (Mantra) to awaken the energy at the base of your spine. It is a powerful tool for spiritual transformation."
                    benefits={[
                        "Spiritual Awakening",
                        "Increased Consciousness",
                        "Nervous System Regulation",
                        "Emotional Release"
                    ]}
                    image="/kundalini-energy.jpg"
                />

                {/* Yoga Nidra */}
                <YogaStyleSection
                    theme="indigo"
                    title="The Sleep of the Yogis"
                    subtitle="Yoga Nidra"
                    description="A state of consciousness between waking and sleeping. In Yoga Nidra, you lie down and follow a guided meditation that takes you into the deepest possible state of relaxation while remaining fully aware. 30 minutes equals 4 hours of sleep."
                    benefits={[
                        "Deepest Possible Relaxation",
                        "Trauma & Stress Release",
                        "Improved Sleep Quality",
                        "Subconscious Reprogramming"
                    ]}
                    image="/yoga-nidra.jpg"
                />

                {/* Meditation & Breathwork */}
                <YogaStyleSection
                    reverse={true}
                    theme="teal"
                    title="Master Your Mind"
                    subtitle="Meditation & Breathwork"
                    description="The physical practice (Asana) is just preparation for meditation. Learn powerful breathwork techniques (Pranayama) to control your life force energy and mindfulness practices to find stillness in chaos."
                    benefits={[
                        "Anxiety & Stress Reduction",
                        "Enhanced Focus & Clarity",
                        "Emotional Balance",
                        "Lower Blood Pressure"
                    ]}
                    image="https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=2053&auto=format&fit=crop"
                />
            </div>

            {/* Premium FAQ Section */}
            <div className="bg-gradient-to-b from-white to-indigo-50/50">
                <FAQSection />
            </div>

            {/* Final CTA */}
            <section className="py-32 bg-gray-900 text-white text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 opacity-80 group-hover:scale-110 transition-transform duration-[3s]"></div>

                <div className="container-custom max-w-4xl relative z-10">
                    <span className="block text-indigo-300 font-bold tracking-widest uppercase mb-6 animate-pulse">Choose Your Path</span>
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">Your Journey <br />Begins Here</h2>
                    <p className="text-xl text-indigo-100/80 mb-14 max-w-2xl mx-auto font-light">
                        Whether you seek physical strength or spiritual awakening, we have a path for you. Join thousands of yogis finding their flow.
                    </p>
                    <Button
                        onClick={() => navigate('/free-trial')}
                        size="large"
                        className="bg-gradient-to-r from-[#ff6b35] to-[#ffb347] text-white shadow-2xl hover:shadow-[0_0_50px_rgba(255,107,53,0.6)] hover:scale-105 transition-all duration-300 border-none hover:from-[#ffb347] hover:to-[#ff6b35] px-12 py-5 text-xl rounded-full"
                    >
                        <span className="flex items-center space-x-3">
                            <span>Start Free Trial</span>
                            <ArrowRight size={24} />
                        </span>
                    </Button>
                </div>
            </section>

        </div>
    )
}

export default FitnessBenefits
