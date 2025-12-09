import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.testimonials);
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

    useEffect(() => {
        if (testimonials.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const nextSlide = () => testimonials.length > 0 && setIndex((prev) => (prev + 1) % testimonials.length);
    const prevSlide = () => testimonials.length > 0 && setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const testimonial = testimonials[index] || {};

    if (loading || testimonials.length === 0) {
        return null; // Don't render section if no data
    }

    return (
        <section id="testimonials" className="py-32 bg-[#030014] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Success Stories</span>
                    </h2>
                </motion.div>

                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute -top-12 -left-12 text-blue-500/10">
                        <Quote size={120} />
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="relative flex-shrink-0">
                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg relative z-10">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={testimonial.id}
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.4 }}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://placehold.co/200x200/1e293b/ffffff?text=User'}
                                        />
                                    </AnimatePresence>
                                </div>
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full -z-10" />
                            </div>

                            <div className="flex-grow text-center md:text-left">
                                <div className="flex justify-center md:justify-start space-x-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} className={`${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.blockquote
                                        key={testimonial.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-xl md:text-3xl font-medium leading-relaxed mb-8 text-gray-200"
                                    >
                                        "{testimonial.quote}"
                                    </motion.blockquote>
                                </AnimatePresence>

                                <div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={testimonial.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <h4 className="text-2xl font-bold text-white mb-1">{testimonial.name}</h4>
                                            <p className="text-blue-400 font-medium">{testimonial.course}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end gap-4 mt-8 md:mt-0 md:absolute md:bottom-12 md:right-12">
                            <button
                                onClick={prevSlide}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
