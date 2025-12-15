import React from 'react'
import { Target, Eye } from 'lucide-react'

const MissionVision = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-x-1/3 -translate-y-1/3 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 translate-x-1/3 translate-y-1/3 animate-pulse-slow"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

                    {/* Mission Card */}
                    <div className="relative overflow-hidden p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(20,184,166,0.25)] transition-all duration-500 group bg-white">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop"
                                alt="Mission Background"
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-opacity duration-700 scale-110"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-teal-50/80 group-hover:from-white/95 group-hover:via-white/80 group-hover:to-teal-50/40 transition-colors duration-500"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 text-teal-600 group-hover:scale-110 group-hover:bg-white/90 group-hover:text-teal-700 transition-all duration-500 shadow-sm backdrop-blur-sm">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-gray-900 mb-6 group-hover:text-teal-800 transition-colors">Our Mission</h3>
                            <p className="text-lg text-gray-600 leading-relaxed font-light group-hover:text-gray-900 transition-colors">
                                To democratize wellness by making <span className="font-semibold text-teal-700">world-class yoga instruction</span> accessible to everyone,
                                regardless of location, schedule, or experience level. We believe that health is a
                                fundamental right, not a luxury.
                            </p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="relative overflow-hidden p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.25)] transition-all duration-500 group bg-white">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
                                alt="Vision Background"
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-opacity duration-700 scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-emerald-50/80 group-hover:from-white/95 group-hover:via-white/80 group-hover:to-emerald-50/40 transition-colors duration-500"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 text-emerald-600 group-hover:scale-110 group-hover:bg-white/90 group-hover:text-emerald-700 transition-all duration-500 shadow-sm backdrop-blur-sm">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-gray-900 mb-6 group-hover:text-emerald-800 transition-colors">Our Vision</h3>
                            <p className="text-lg text-gray-600 leading-relaxed font-light group-hover:text-gray-900 transition-colors">
                                A world where <span className="font-semibold text-emerald-700">inner peace</span> is a daily habit, not a distant goal. We envision a global
                                community connected by breath, movement, and a shared commitment to personal growth
                                and collective well-being.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default MissionVision
