import React, { useRef, useEffect } from 'react'
import { Check, ArrowRight, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const YogaStyleSection = ({
    title,
    subtitle,
    description,
    benefits,
    image,
    reverse = false,
    theme = 'sage' // sage, orange, indigo, rose, gold, teal
}) => {
    const navigate = useNavigate()
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0')
                        entry.target.classList.remove('opacity-0', 'translate-y-10')
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current)
        }
    }, [])

    const themeColors = {
        sage: {
            bg: 'from-emerald-50 to-teal-50',
            text: 'text-emerald-800',
            accent: 'bg-emerald-100/80',
            icon: 'text-emerald-600',
            button: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 w-full',
            glow: 'shadow-emerald-500/30'
        },
        orange: {
            bg: 'from-orange-50 to-amber-50',
            text: 'text-orange-900',
            accent: 'bg-orange-100/80',
            icon: 'text-orange-600',
            button: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 w-full',
            glow: 'shadow-orange-500/30'
        },
        indigo: {
            bg: 'from-indigo-50 to-violet-50',
            text: 'text-indigo-900',
            accent: 'bg-indigo-100/80',
            icon: 'text-indigo-600',
            button: 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 w-full',
            glow: 'shadow-indigo-500/30'
        },
        rose: {
            bg: 'from-rose-50 to-pink-50',
            text: 'text-rose-900',
            accent: 'bg-rose-100/80',
            icon: 'text-rose-600',
            button: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 w-full',
            glow: 'shadow-rose-500/30'
        },
        gold: {
            bg: 'from-yellow-50 to-amber-50',
            text: 'text-yellow-900',
            accent: 'bg-yellow-100/80',
            icon: 'text-amber-600',
            button: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 w-full',
            glow: 'shadow-yellow-500/30'
        },
        teal: {
            bg: 'from-teal-50 to-cyan-50',
            text: 'text-teal-900',
            accent: 'bg-teal-100/80',
            icon: 'text-teal-600',
            button: 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 w-full',
            glow: 'shadow-teal-500/30'
        }
    }

    const currentTheme = themeColors[theme] || themeColors.sage

    return (
        <div className="py-24 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className={`absolute top-0 w-full h-full bg-gradient-to-br ${reverse ? 'from-white via-gray-50 to-white' : 'from-gray-50 via-white to-gray-50'} -z-20`}></div>
            <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${currentTheme.bg.split(' ')[0].replace('from-', 'from-')}/20 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-[2s]`}></div>
            <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr ${currentTheme.bg.split(' ')[1].replace('to-', 'from-')}/20 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-[2s]`}></div>

            <div
                ref={sectionRef}
                className={`container-custom relative z-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out`}
            >
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>

                    {/* Image Side - Floating Glass Card Effect */}
                    <div className="w-full lg:w-1/2 perspective-1000">
                        <div className="relative group/image">
                            {/* Card Glow */}
                            <div className={`absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r ${currentTheme.button.split(' ')[1]} ${currentTheme.button.split(' ')[3]} opacity-30 blur-xl group-hover/image:opacity-50 transition-opacity duration-500`}></div>

                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover/image:rotate-y-2 group-hover/image:scale-[1.02]">
                                <div className="absolute inset-0 bg-black/10 z-10 group-hover/image:bg-transparent transition-colors duration-500"></div>
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] object-cover object-center transform transition-transform duration-[1.5s] group-hover/image:scale-110"
                                />

                                {/* Glass Overlay Content */}
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90">
                                    <div className="transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500">
                                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 text-white mb-3">
                                            <Play size={14} fill="currentColor" />
                                            <span className="text-xs font-bold tracking-wider uppercase">Preview Class</span>
                                        </div>
                                        <p className="text-white/90 text-sm font-light leading-relaxed opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 delay-100">
                                            Experience the essence of {subtitle} in a short guided preview.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 z-30 animate-float bg-white/80 backdrop-blur-xl border border-white/60 p-4 rounded-2xl shadow-xl hidden md:block">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-full ${currentTheme.accent}`}>
                                        <Check size={18} className={currentTheme.icon} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Top Benefit</p>
                                        <p className={`font-bold ${currentTheme.text} text-sm`}>{benefits[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            <span className={`inline-block py-1.5 px-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-6 ${currentTheme.accent} ${currentTheme.text} shadow-sm border border-white/50 backdrop-blur-sm`}>
                                {subtitle}
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                                {title}
                            </h2>

                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 font-light max-w-xl">
                                {description}
                            </p>

                            <div className="bg-white/60 backdrop-blur-lg border border-white/60 rounded-3xl p-8 mb-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <h3 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center ${currentTheme.text}`}>
                                    <span className={`w-2 h-2 rounded-full mr-3 ${currentTheme.button.split(' ')[1].replace('from-', 'bg-')}`}></span>
                                    Transformative Benefits
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start space-x-3 group/benefit">
                                            <div className={`mt-1 p-0.5 rounded-full transition-colors duration-300 ${currentTheme.icon}`}>
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-gray-700 font-medium group-hover/benefit:text-gray-900 transition-colors">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Button
                                    onClick={() => navigate('/schedule')}
                                    className={`${currentTheme.button} text-white shadow-xl ${currentTheme.glow} border-none py-4 px-8 rounded-xl text-lg group/btn overflow-hidden relative`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
                                    <span className="flex items-center justify-center space-x-3 relative z-10">
                                        <span>Book {subtitle} Session</span>
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default YogaStyleSection
