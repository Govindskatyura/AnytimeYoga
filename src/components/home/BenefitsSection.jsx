import React from 'react'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { Wind, Zap, Heart, Brain, Sun, Users } from 'lucide-react'

const benefits = [
    {
        icon: <Wind size={24} className="text-white" />,
        title: "Stress Relief",
        description: "Calm your mind and reduce anxiety through guided breathing and mindful movement.",
        color: "bg-yoga-sage-500",
        image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop",
        tip: "Inhale for 4 counts, hold for 4, exhale for 4. Reset your nervous system instantly."
    },
    {
        icon: <Zap size={24} className="text-white" />,
        title: "Increased Flexibility",
        description: "Improve your range of motion and reduce muscle tension with regular practice.",
        color: "bg-yoga-peach-500",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
        tip: "Never force a pose. Breathe into the tightness and let gravity do the work."
    },
    {
        icon: <Heart size={24} className="text-white" />,
        title: "Better Heart Health",
        description: "Lower blood pressure and improve circulation for a healthier cardiovascular system.",
        color: "bg-red-500",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
        tip: "Flow with your breath. Let each movement pump vitality through your veins."
    },
    {
        icon: <Brain size={24} className="text-white" />,
        title: "Mental Clarity",
        description: "Sharpen your focus and enhance cognitive function through meditation.",
        color: "bg-yoga-lavender-500",
        image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop",
        tip: "Where your gaze goes, your mind follows. Fix your eyes (Drishti) on one point."
    },
    {
        icon: <Sun size={24} className="text-white" />,
        title: "Energy Boost",
        description: "Revitalize your body and fight fatigue with energizing yoga flows.",
        color: "bg-yellow-500",
        image: "/energy-boost.jpg",
        tip: "Feeling sluggish? Try 3 rounds of Sun Salutations to wake up every cell."
    },
    {
        icon: <Users size={24} className="text-white" />,
        title: "Community Support",
        description: "Connect with like-minded individuals on the same journey to wellness.",
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop",
        tip: "Practice together, grow together. Shared energy amplifies your personal practice."
    }
]

const BenefitsSection = () => {
    return (
        <section id="benefits" className="section-padding relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1507643179173-442f8552932c?q=80&w=2068&auto=format&fit=crop"
                    alt="Ethereal Sky"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container-custom relative z-10">
                <SectionTitle
                    title="Holistic Benefits"
                    subtitle="Why Choose Yoga?"
                    className="mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <Card
                            key={index}
                            coverImage={benefit.image}
                            className="h-full bg-white/80 backdrop-blur-md border border-white/50 hover:border-yoga-sage-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="relative">
                                {/* Icon floating over image/content intersection */}
                                <div className={`absolute -top-10 right-4 w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                    {benefit.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2">{benefit.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {benefit.description}
                                </p>

                                <div className="bg-white/50 rounded-lg p-3 border border-white/60">
                                    <p className="text-sm font-medium text-yoga-sage-700">
                                        <span className="mr-2">💡</span>
                                        {benefit.tip}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Spiritual Connection Section */}
                <div className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
                    <div className="absolute inset-0">
                        <img
                            src="/way-of-life.jpg"
                            alt="Spiritual Guru Meditation by Sacred Lake"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-8 md:p-16 max-w-2xl text-white">
                        <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                            Yoga is Not Just Exercise,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoga-sage-300 to-yoga-lavender-300">
                                It's a Way of Life
                            </span>
                        </h3>
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                            Beyond the physical postures lies a journey of self-discovery. Yoga connects your breath to your movement, and your movement to your spirit. It awakens the dormant energy within, bringing vitality, clarity, and a profound sense of aliveness to every moment of your day.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-yoga-sage-300">✨</span>
                                <span className="text-sm font-medium">Spiritual Awakening</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-yoga-peach-300">🌱</span>
                                <span className="text-sm font-medium">Vitality & Energy</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-yoga-lavender-300">🧘‍♀️</span>
                                <span className="text-sm font-medium">Inner Peace</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection
