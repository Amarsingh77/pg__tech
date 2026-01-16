import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Building, Cog } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import { getThemeByStream } from '../../data/themes';

// Map course titles to icons
const getIconForCourse = (title) => {
    const lowerTitle = title?.toLowerCase() || '';
    if (lowerTitle.includes('computer') || lowerTitle.includes('software') || lowerTitle.includes('programming')) return Code;
    if (lowerTitle.includes('mechanical') || lowerTitle.includes('robotics')) return Cog;
    if (lowerTitle.includes('civil') || lowerTitle.includes('construction')) return Building;
    return Cpu;
};

const CoursesSection = ({ onEnrollClick }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`${API_ENDPOINTS.courses}?homePage=true&limit=4&sort=order`);
                if (!res.ok) throw new Error('Failed to fetch courses');
                const data = await res.json();
                setCourses(Array.isArray(data) ? data : (data.data || []));
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading || courses.length === 0) {
        return null;
    }

    return (
        <section id="courses" className="py-24 bg-[#030014] text-white relative overflow-hidden">
            {/* Optimized Background - Removed excessive gradients for performance on mobile */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Programs</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Comprehensive curriculum designed by industry leaders.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course, i) => {
                        const IconComponent = getIconForCourse(course.title);
                        const theme = getThemeByStream(course.stream);

                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }} // Load slightly earlier
                                transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.4) }} // Cap delay
                            >
                                <div className="h-full relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 group">

                                    <div className="mb-6 relative">
                                        <div className={`absolute -inset-2 bg-gradient-to-br ${theme.buttonGradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                                        <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${theme.buttonGradient} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                            <IconComponent size={32} className="text-white" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                                            {course.description}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-xs font-medium text-gray-300">
                                                <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} mr-2`} />
                                                <span>{course.level || 'Professional'}</span>
                                            </div>
                                            <div className="flex items-center text-xs font-medium text-gray-300">
                                                <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} mr-2`} />
                                                <span>{course.duration || '6 Months'}</span>
                                            </div>
                                        </div>

                                        <div className="mb-6 flex items-baseline gap-2">
                                            {course.discountedPrice > 0 ? (
                                                <>
                                                    <span className="text-xl font-bold text-white">₹{course.discountedPrice.toLocaleString()}</span>
                                                    <span className="text-sm text-gray-500 line-through">₹{course.price.toLocaleString()}</span>
                                                </>
                                            ) : (
                                                <span className="text-xl font-bold text-white">
                                                    {course.price > 0 ? `₹${course.price.toLocaleString()}` : 'Free'}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onEnrollClick(course)}
                                        className={`w-full py-3 rounded-lg bg-gradient-to-r ${theme.buttonGradient} text-white font-semibold text-sm shadow-md transition-all duration-300 transform group-hover:scale-[1.02] active:scale-95 flex items-center justify-center`}
                                    >
                                        Explore Course
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
