import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, ArrowRight, Code, Cpu, Building, Cog } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

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
                const res = await fetch(API_ENDPOINTS.courses);
                const data = await res.json();
                setCourses(data);
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

    const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500', 'from-green-500 to-emerald-500'];

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
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <SpotlightCard className="h-full flex flex-col">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center mb-8 shadow-lg`}>
                                        <IconComponent size={32} className="text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-white">{course.title}</h3>
                                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                                        {course.description}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center text-sm text-gray-300">
                                            <BarChart size={16} className="mr-3 text-blue-400" />
                                            <span>{course.level || 'All Levels'}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-300">
                                            <Users size={16} className="mr-3 text-purple-400" />
                                            <span>{course.duration || '6 Months'}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onEnrollClick(course)}
                                        className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center justify-center group"
                                    >
                                        Enroll Now
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
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
