import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Building, Cog } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import { getThemeByStream } from '../../data/themes';

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-10 shadow-2xl ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
                }}
            />
            <div className="relative h-full flex flex-col">{children}</div>
        </div>
    );
};

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
        <section id="courses" className="py-32 bg-[#030014] text-white relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
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
                        Comprehensive curriculum designed by industry leaders and academic experts.
                        From foundational diplomas to advanced post-graduate certifications.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {courses.map((course, i) => {
                        const IconComponent = getIconForCourse(course.title);
                        const theme = getThemeByStream(course.stream);

                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <SpotlightCard className="h-full">
                                    <div className="mb-8 relative group/icon">
                                        <div className={`absolute -inset-4 bg-gradient-to-br ${theme.buttonGradient} rounded-3xl opacity-20 blur-2xl transition-all duration-500 group-hover/icon:opacity-40`} />
                                        <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${theme.buttonGradient} flex items-center justify-center shadow-xl transform transition-transform duration-500 group-hover/icon:scale-110 group-hover/icon:rotate-3`}>
                                            <IconComponent size={40} className="text-white" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-bold mb-4 text-white hover:text-blue-400 transition-colors duration-300 line-clamp-2 min-h-[4rem]">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3">
                                            {course.description}
                                        </p>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center text-sm font-medium text-gray-300">
                                                <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} mr-3 shadow-[0_0_12px_rgba(0,0,0,0.5)]`} />
                                                <span>{course.level || 'Professional Certification'}</span>
                                            </div>
                                            <div className="flex items-center text-sm font-medium text-gray-300">
                                                <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} mr-3 shadow-[0_0_12px_rgba(0,0,0,0.5)]`} />
                                                <span>{course.duration || '6 Months Duration'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onEnrollClick(course)}
                                        className={`w-full py-4 rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center group/btn`}
                                    >
                                        Explore Course
                                        <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={18} />
                                    </button>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
