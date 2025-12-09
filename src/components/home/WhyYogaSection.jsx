import React from 'react'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { Clock, Home, Shield } from 'lucide-react'

const WhyYogaSection = () => {
    return (
        <section id="why-yoga" className="section-padding bg-gray-50">
            <div className="container-custom">
                <SectionTitle
                    title="Why Anytime Yoga?"
                    subtitle="Designed for You"
                    className="mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Flexible Schedule */}
                    <Card
                        coverImage="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                        className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-yoga-sage-100 rounded-full flex items-center justify-center mb-6 text-yoga-sage-600">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Flexible Schedule</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Book sessions that fit your timeline. Early morning, lunch break, or late night — we're here when you are.
                            </p>
                        </div>
                    </Card>

                    {/* Comfort of Home */}
                    <Card
                        coverImage="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop"
                        className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-yoga-lavender-100 rounded-full flex items-center justify-center mb-6 text-yoga-lavender-600">
                                <Home size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Comfort of Home</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No commute, no crowded studios. Practice in your own safe space with high-quality virtual guidance.
                            </p>
                        </div>
                    </Card>

                    {/* Verified Experts */}
                    <Card
                        coverImage="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                        className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-yoga-peach-100 rounded-full flex items-center justify-center mb-6 text-yoga-peach-600">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Verified Experts</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Learn from certified, experienced instructors who are passionate about your growth and safety.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default WhyYogaSection
