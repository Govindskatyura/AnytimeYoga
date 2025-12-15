import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Zap, Shield, Heart, Brain, Moon, Smile, Wind, ArrowUpRight } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const FitnessWellnessSection = () => {
    const physicalBenefits = [
        {
            icon: <Activity size={24} />,
            title: "Flexibility",
            description: "Unlock your body's potential range of motion and reduce stiffness.",
            image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: <Zap size={24} />,
            title: "Strength",
            description: "Build lean muscle and core stability through holding poses.",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: <Shield size={24} />,
            title: "Immunity",
            description: "Stimulate the lymphatic system to fight infection and disease.",
            image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: <Heart size={24} />,
            title: "Heart Health",
            description: "Lower blood pressure and improve cardiovascular circulation.",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
        }
    ]

    const mentalBenefits = [
        {
            icon: <Brain size={24} />,
            title: "Focus",
            description: "Sharpen your concentration and mental clarity through mindfulness.",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: <Moon size={24} />,
            title: "Better Sleep",
            description: "Calm the nervous system to prepare the body for deep rest.",
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: <Smile size={24} />,
            title: "Mood Boost",
            description: "Release endorphins and reduce cortisol levels naturally.",
            image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop"
        },
        {
            icon: <Wind size={24} />,
            title: "Stress Relief",
            description: "Learn breathwork techniques to manage anxiety instantly.",
            image: "https://images.unsplash.com/photo-1508672019048-805c276e7e5e?q=80&w=800&auto=format&fit=crop"
        }
    ]

    const BenefitCard = ({ item, colorTheme }) => {
        const isPeach = colorTheme === 'peach';
        // Cosmic Color Mapping
        const bgGradient = isPeach
            ? 'from-orange-50 to-rose-50 hover:from-orange-100 hover:to-rose-100'
            : 'from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100';

        const accentColor = isPeach ? 'text-orange-500' : 'text-indigo-500';
        const ringColor = isPeach ? 'ring-orange-100' : 'ring-indigo-100';

        // Generate ID from title (e.g., "Heart Health" -> "heart-health")
        const id = item.title.toLowerCase().replace(/\s+/g, '-');

        return (
            <Link to={`/benefit/${id}`} className="block h-full group perspective-1000">
                <div className={`relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col border border-gray-100`}>

                    {/* Image Area with Overlay */}
                    <div className="h-48 overflow-hidden relative">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isPeach ? 'from-orange-900/60' : 'from-indigo-900/60'} to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>

                        {/* Floating Icon Badge */}
                        <div className={`absolute -bottom-6 right-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${accentColor} shadow-xl z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                            {item.icon}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className={`p-8 pt-10 flex-grow bg-gradient-to-br ${bgGradient} transition-colors duration-500`}>
                        <h4 className="text-2xl font-display font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                            <span className={`text-xs font-bold uppercase tracking-wider ${accentColor}`}>Learn More</span>
                            <div className={`p-2 rounded-full bg-white/50 text-gray-400 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:rotate-45`}>
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent -z-10"></div>

            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-purple-600 font-bold tracking-widest uppercase mb-4 block">Holistic Well-being</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">Complete Harmony</h2>
                    <p className="text-xl text-gray-500 font-light">Integrating body and mind for a balanced existence.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
                    {/* Vertical Divider (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

                    {/* Physical Vitality Column */}
                    <div>
                        <div className="flex items-center justify-center mb-12">
                            <div className="text-center">
                                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">Physical Vitality</h3>
                                <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full mx-auto"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {physicalBenefits.map((item, index) => (
                                <BenefitCard key={index} item={item} colorTheme="peach" />
                            ))}
                        </div>
                    </div>

                    {/* Mental Clarity Column */}
                    <div>
                        <div className="flex items-center justify-center mb-12">
                            <div className="text-center">
                                <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">Mental Clarity</h3>
                                <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {mentalBenefits.map((item, index) => (
                                <BenefitCard key={index} item={item} colorTheme="lavender" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FitnessWellnessSection
