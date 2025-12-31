import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, User, Briefcase, Linkedin } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.testimonials);
                if (!res.ok) throw new Error('Failed to fetch testimonials');
                const data = await res.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);


    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
                            Student Success Stories
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            Voices of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                                Transformation
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Don't just take our word for it. Hear from the thousands of students who have transformed their careers and lives with TechInstitute.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Testimonial */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Quote size={200} className="text-white" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Featured Student"
                                className="w-48 h-48 rounded-2xl object-cover shadow-lg"
                            />
                            <div>
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold italic mb-6 leading-relaxed">
                                    "I was skeptical about online learning, but TechInstitute changed my perspective entirely. The mentorship, the community, and the rigorous curriculum are world-class. I'm now leading a team of 10 developers."
                                </h3>
                                <div>
                                    <h4 className="text-xl font-bold text-white">Amanda Richardson</h4>
                                    <p className="text-purple-400">Engineering Manager at Spotify</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full border-2 border-purple-500/30"
                                    />
                                    <div>
                                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-500 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-300 italic flex-grow">"{testimonial.quote}"</p>
                                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Alumni</span>
                                    <Linkedin size={18} className="text-blue-400 cursor-pointer hover:text-white transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / CTA */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Join 20,000+ Happy Students</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div className="p-6 bg-gray-800 rounded-xl">
                            <h3 className="text-4xl font-bold text-purple-400 mb-2">4.9/5</h3>
                            <p className="text-gray-400">Average Rating</p>
                        </div>
                        <div className="p-6 bg-gray-800 rounded-xl">
                            <h3 className="text-4xl font-bold text-blue-400 mb-2">98%</h3>
                            <p className="text-gray-400">Completion Rate</p>
                        </div>
                        <div className="p-6 bg-gray-800 rounded-xl">
                            <h3 className="text-4xl font-bold text-green-400 mb-2">85%</h3>
                            <p className="text-gray-400">Career Transition</p>
                        </div>
                        <div className="p-6 bg-gray-800 rounded-xl">
                            <h3 className="text-4xl font-bold text-pink-400 mb-2">24/7</h3>
                            <p className="text-gray-400">Mentor Support</p>
                        </div>
                    </div>
                    <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full shadow-lg shadow-purple-600/30 transition-all transform hover:scale-105">
                        Start Your Success Story
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
