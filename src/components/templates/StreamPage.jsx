import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Star } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const StreamPage = ({ streamName, streamId, theme, description, icon: Icon }) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.courses);
                if (!res.ok) throw new Error('Failed to fetch courses');
                const data = await res.json();
                const courseList = Array.isArray(data) ? data : (data.data || []);
                setCourses(courseList.filter(c => c.stream === streamId));
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [streamId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 overflow-hidden relative">
            {/* Background Elements */}
            <div className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none`}>
                <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px] ${theme.bg}`} />
                <div className={`absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] ${theme.bg}`} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl">
                        {Icon && <Icon className={`w-8 h-8 mr-3 ${theme.text}`} />}
                        <span className={`text-sm font-bold uppercase tracking-wider ${theme.text}`}>
                            Start Your Journey
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                            {streamName}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Course Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-96 bg-gray-800/50 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <motion.div
                                    key={course.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className={`group relative bg-gray-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700 hover:${theme.border} transition-all duration-300 shadow-lg hover:shadow-2xl`}
                                >
                                    {/* Image Section */}
                                    <div className="h-56 overflow-hidden relative">
                                        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 z-10`} />
                                        {course.image ? (
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gray-800 flex items-center justify-center ${theme.lightBg}`}>
                                                <BookOpen size={48} className={theme.text} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-md rounded-full text-xs font-bold border border-gray-700 flex items-center">
                                                <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
                                                {course.level || 'All Levels'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                            {course.description}
                                        </p>

                                        <button
                                            onClick={() => navigate(`/course/${course.id}`)}
                                            className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${theme.buttonGradient} opacity-90 group-hover:opacity-100 transition-all flex items-center justify-center shadow-lg group-hover:shadow-${theme.color}-500/30 transform group-hover:translate-y-[-2px]`}
                                        >
                                            View Details <ArrowRight className="ml-2 w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-400 text-xl">No courses available for {streamName} yet.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default StreamPage;
