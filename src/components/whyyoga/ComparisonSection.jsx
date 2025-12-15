import React from 'react'
import { Clock, Coffee, Smartphone, AlertCircle, Feather, Sun, Droplets, Smile } from 'lucide-react'

const ComparisonSection = () => {
    return (
        <section className="py-24 bg-[#0f172a] overflow-hidden relative">
            {/* Spiritual Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/chakra-meditation.jpg"
                    alt="Chakra Energy Centers Meditation"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-indigo-400 font-bold tracking-widest uppercase mb-4 block animate-pulse-slow">Life vs. Lifestyle</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">The Choice is Yours</h2>
                    <p className="text-xl text-gray-400 font-light">See the difference a daily practice makes in your life.</p>
                </div>

                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px] border border-white/10">

                    {/* Left Side: The Rush (Busy) */}
                    <div className="md:w-1/2 bg-gray-900/60 backdrop-blur-md relative p-10 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 group hover:bg-gray-900/70 transition-colors duration-500">
                        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

                        <div className="relative z-10 text-center md:text-right">
                            <div className="inline-flex p-4 rounded-2xl bg-red-500/10 text-red-400 mb-8 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                <AlertCircle size={36} />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-3">The Daily Rush</h3>
                            <p className="text-red-300/80 mb-12 font-medium tracking-wide uppercase text-sm">Stress • Fatigue • Burnout</p>

                            <div className="space-y-8 flex flex-col items-center md:items-end">
                                <div className="flex items-center space-x-6 text-gray-400 opacity-60 group-hover:opacity-100 transition-all duration-300 hover:text-white group-hover:translate-x-[-10px]">
                                    <span className="text-xl font-light">Constant Notifications</span>
                                    <Smartphone size={28} />
                                </div>
                                <div className="flex items-center space-x-6 text-gray-400 opacity-60 group-hover:opacity-100 transition-all duration-300 delay-75 hover:text-white group-hover:translate-x-[-10px]">
                                    <span className="text-xl font-light">Rushed Mornings</span>
                                    <Clock size={28} />
                                </div>
                                <div className="flex items-center space-x-6 text-gray-400 opacity-60 group-hover:opacity-100 transition-all duration-300 delay-150 hover:text-white group-hover:translate-x-[-10px]">
                                    <span className="text-xl font-light">Caffeine Dependency</span>
                                    <Coffee size={28} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: The Flow (Balance) */}
                    <div className="md:w-1/2 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-md relative p-10 md:p-16 flex flex-col justify-center group transition-all duration-500 hover:from-indigo-900/70 hover:to-purple-900/70">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse-slow"></div>

                        <div className="relative z-10 text-center md:text-left">
                            <div className="inline-flex p-4 rounded-2xl bg-indigo-500/20 text-indigo-300 mb-8 border border-indigo-400/30 shadow-[0_0_30px_rgba(129,140,248,0.2)]">
                                <Sun size={36} />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-3">The Yoga Balance</h3>
                            <p className="text-indigo-300/80 mb-12 font-medium tracking-wide uppercase text-sm">Clarity • Energy • Peace</p>

                            <div className="space-y-8 flex flex-col items-center md:items-start">
                                <div className="flex items-center space-x-6 text-indigo-100 group-hover:translate-x-4 transition-transform duration-300">
                                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                                        <Feather size={24} />
                                    </div>
                                    <span className="text-xl">Mindful Presence</span>
                                </div>
                                <div className="flex items-center space-x-6 text-indigo-100 group-hover:translate-x-4 transition-transform duration-300 delay-75">
                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                                        <Droplets size={24} />
                                    </div>
                                    <span className="text-xl">Natural Energy</span>
                                </div>
                                <div className="flex items-center space-x-6 text-indigo-100 group-hover:translate-x-4 transition-transform duration-300 delay-150">
                                    <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300">
                                        <Smile size={24} />
                                    </div>
                                    <span className="text-xl">Inner Calm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Divider/Icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-20 h-20 bg-[#0f172a] rounded-full items-center justify-center shadow-2xl text-white font-bold text-lg border-4 border-gray-800">
                        VS
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ComparisonSection
