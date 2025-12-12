import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Send, Sparkles, Star } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { api } from '../services/api'
import useToast from '../hooks/useToast'
import cosmicBg from '../assets/images/cosmic-bg.png'

const FreeTrial = () => {
    const navigate = useNavigate()
    const { showToast, ToastComponent } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: 'General Yoga',
        goal: '',
        message: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await api.submitInquiry(formData)
            showToast('Inquiry sent successfully! We will contact you soon.', 'success')

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                interest: 'General Yoga',
                goal: '',
                message: ''
            })
        } catch (error) {
            showToast('Something went wrong. Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen font-sans text-gray-100 selection:bg-yoga-sage-500 selection:text-white relative overflow-x-hidden" style={{
            backgroundImage: `url(${cosmicBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] z-0"></div>

            <ToastComponent />

            <div className="relative z-10 container-custom max-w-7xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">

                {/* Minimal Header */}
                <div className="absolute top-8 left-4 md:left-8">
                    <Link to="/" className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-300">
                        <ArrowLeft size={18} className="text-gray-300 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Back to Home</span>
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mt-16 lg:mt-0">

                    {/* Left Column: Hero Content */}
                    <div className="lg:w-1/2 space-y-8 animate-slide-up">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yoga-peach-500/20 rounded-full border border-yoga-peach-500/30">
                            <Sparkles size={14} className="text-yoga-peach-300" />
                            <span className="text-xs font-semibold text-yoga-peach-200 tracking-wide uppercase">Limited Time Offer</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                            Begin Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoga-peach-300 to-yoga-sage-300">Transformation</span>
                        </h1>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                            Experience the harmony of mind and body with a complimentary session. Join our community of over 5,000 satisfied practitioners.
                        </p>

                        <div className="grid gap-4">
                            {[
                                "Personalized wellness assessment",
                                "One-on-one consultation with expert",
                                "Access to premium beginner classes",
                                "Customized nutrition roadmap"
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yoga-sage-400 to-yoga-sage-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-yoga-sage-500/30">
                                        <CheckCircle size={20} className="text-white" />
                                    </div>
                                    <span className="text-lg font-medium text-gray-100">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <span>Trusted by 5,000+ students worldwide</span>
                        </div>
                    </div>

                    {/* Right Column: Glass Form */}
                    <div className="lg:w-1/2 w-full animate-scale-in delay-100">
                        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Decorative blur blob */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-yoga-sage-500/20 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-2">Claim Your Free Pass</h2>
                                <p className="text-gray-400 mb-8">No credit card required. Easy 30-second signup.</p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-gray-400 ml-1">First Name</label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 transition-all font-medium"
                                                placeholder="Jane"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-gray-400 ml-1">Last Name</label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 transition-all font-medium"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 transition-all font-medium"
                                            placeholder="jane@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-400 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 transition-all font-medium"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-400 ml-1">I'm interested in...</label>
                                        <div className="relative">
                                            <select
                                                name="interest"
                                                value={formData.interest}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option className="bg-gray-900" value="General Yoga">General Yoga</option>
                                                <option className="bg-gray-900" value="Weight Loss">Weight Loss</option>
                                                <option className="bg-gray-900" value="Flexibility">Flexibility</option>
                                                <option className="bg-gray-900" value="Meditation">Meditation & Mindfulness</option>
                                                <option className="bg-gray-900" value="Prenatal Yoga">Prenatal Yoga</option>
                                                <option className="bg-gray-900" value="Teacher Training">Teacher Training</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-400 ml-1">Your Main Goal</label>
                                        <textarea
                                            name="goal"
                                            value={formData.goal}
                                            onChange={handleChange}
                                            rows="2"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yoga-sage-500/50 transition-all resize-none"
                                            placeholder="What do you hope to achieve?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-yoga-sage-500 to-yoga-sage-600 hover:from-yoga-sage-400 hover:to-yoga-sage-500 text-white font-bold text-lg shadow-lg shadow-yoga-sage-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                    >
                                        {isLoading ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <span>Request Free Trial</span>
                                                <Send size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeTrial
