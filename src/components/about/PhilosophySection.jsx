import React from 'react'
import { Heart, BookOpen, Users } from 'lucide-react'

const PhilosophySection = () => {
    return (
        <section className="py-28 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
                        {/* Abstract Shapes */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>

                        <div className="relative group perspective-1000">
                            <div className="absolute inset-0 bg-black/5 rounded-[2.5rem] transform translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"></div>
                            <img
                                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop"
                                alt="Teacher adjusting student"
                                className="relative rounded-[2.5rem] shadow-2xl w-full h-[650px] object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Floating Quote Card */}
                            <div className="absolute bottom-10 -left-6 md:-left-12 max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 transform group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="text-4xl text-teal-800/20 absolute -top-4 left-4 font-serif">"</div>
                                <p className="text-gray-800 italic font-medium leading-relaxed relative z-10">
                                    A true teacher does not lead you to the threshold of their mind, but leads you to the threshold of your own.
                                </p>
                                <div className="h-px w-12 bg-teal-500 mt-4 mb-2"></div>
                                <p className="text-teal-700 text-xs font-bold uppercase tracking-widest">— Kahlil Gibran</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <span className="text-teal-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Philosophy</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-8 leading-[1.1]">
                            Guides, Not Just <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Instructors</span>
                        </h2>

                        <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
                            At Anytime Yoga, we believe that a great yoga teacher is defined by their <span className="text-gray-900 font-medium">empathy</span>, not just their flexibility.
                            We hire educators who are lifelong students first.
                        </p>

                        <div className="space-y-10">
                            {/* Philosophy Point 1 */}
                            <div className="flex items-start space-x-6 group">
                                <div className="bg-rose-50 p-4 rounded-2xl text-rose-500 mt-1 group-hover:bg-rose-100 group-hover:scale-110 transition-all duration-300">
                                    <Heart size={28} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-display font-bold text-gray-900 mb-2">Led by Empathy</h4>
                                    <p className="text-gray-600 leading-relaxed">We teach to the body in front of us, offering modifications and support for every unique anatomy.</p>
                                </div>
                            </div>

                            {/* Philosophy Point 2 */}
                            <div className="flex items-start space-x-6 group">
                                <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-500 mt-1 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-300">
                                    <BookOpen size={28} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-display font-bold text-gray-900 mb-2">Rooted in Wisdom</h4>
                                    <p className="text-gray-600 leading-relaxed">Our practice honors the ancient traditions of yoga while adapting them for modern life.</p>
                                </div>
                            </div>

                            {/* Philosophy Point 3 */}
                            <div className="flex items-start space-x-6 group">
                                <div className="bg-teal-50 p-4 rounded-2xl text-teal-500 mt-1 group-hover:bg-teal-100 group-hover:scale-110 transition-all duration-300">
                                    <Users size={28} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-display font-bold text-gray-900 mb-2">Community First</h4>
                                    <p className="text-gray-600 leading-relaxed">We foster a non-judgmental space where everyone belongs, regardless of skill level.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default PhilosophySection
