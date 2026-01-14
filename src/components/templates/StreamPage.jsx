import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Star, Clock, BarChart, TrendingUp, Search, X } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const StreamPage = ({ streamName, streamId, theme, description, icon: Icon }) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLevel, setFilterLevel] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.courses);
                if (!res.ok) throw new Error('Failed to fetch courses');
                const data = await res.json();
                const courseList = Array.isArray(data) ? data : (data.data || []);
                const streamCourses = courseList.filter(c => c.stream === streamId);
                setCourses(streamCourses);
                setFilteredCourses(streamCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [streamId]);

    useEffect(() => {
        let filtered = [...courses];

        // Apply level filter
        if (filterLevel !== 'all') {
            filtered = filtered.filter(c => c.level === filterLevel);
        }

        // Apply search
        if (searchQuery) {
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        if (sortBy === 'duration') {
            filtered.sort((a, b) => (a.duration || '').localeCompare(b.duration || ''));
        }

        setFilteredCourses(filtered);
    }, [filterLevel, searchQuery, sortBy, courses]);

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-20 pb-20 overflow-hidden relative">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            {/* Animated Gradient Orbs */}
            <div className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none`}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-15 blur-[150px] bg-gradient-to-br ${theme.buttonGradient}`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -180, 0],
                        x: [0, -100, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute top-[50%] -right-[15%] w-[50%] h-[50%] rounded-full opacity-10 blur-[130px] bg-gradient-to-tl ${theme.buttonGradient}`}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Epic Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 pt-8"
                >
                    {/* Icon Badge */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center p-4 mb-8 rounded-3xl bg-gray-900/50 backdrop-blur-2xl border border-gray-800/50 shadow-2xl"
                    >
                        {Icon && <Icon className={`w-10 h-10 mr-4 ${theme.text}`} strokeWidth={1.5} />}
                        <span className={`text-sm font-black uppercase tracking-[0.3em] ${theme.text}`}>
                            Master Your Craft
                        </span>
                    </motion.div>

                    {/* Massive Title */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.9]">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText} drop-shadow-2xl`}>
                            {streamName}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
                        {description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <div className={`text-5xl font-black ${theme.text} mb-2`}>{courses.length}+</div>
                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Courses</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <div className={`text-5xl font-black ${theme.text} mb-2`}>5,240+</div>
                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Students</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-center"
                        >
                            <div className={`text-5xl font-black ${theme.text} mb-2`}>96%</div>
                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Success Rate</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Filter & Search Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-12"
                >
                    <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-gray-800/50 shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            {/* Level Filter */}
                            <div className="flex gap-2">
                                {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setFilterLevel(level)}
                                        className={`px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${filterLevel === level
                                            ? `bg-gradient-to-r ${theme.buttonGradient} text-white shadow-lg`
                                            : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                                            }`}
                                    >
                                        {level === 'all' ? 'All' : level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-sm text-gray-500 font-medium">
                            Showing <span className={`${theme.text} font-bold`}>{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
                        </div>
                    </div>
                </motion.div>

                {/* Course Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[500px] bg-gray-800/30 rounded-[2.5rem] animate-pulse border border-gray-800/50" />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filterLevel + searchQuery}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <motion.div
                                        key={course.id}
                                        variants={itemVariants}
                                        layout
                                        className="group relative"
                                    >
                                        {/* Card Glow Effect */}
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${theme.buttonGradient} rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

                                        {/* Card */}
                                        <div className="relative bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-gray-800/50 hover:border-gray-700/80 transition-all duration-500 shadow-2xl h-full flex flex-col">
                                            {/* Image Section with Overlay */}
                                            <div className="aspect-[4/3] overflow-hidden relative">
                                                {/* Gradient Overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 z-10`} />

                                                {course.image ? (
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className={`w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`}>
                                                        <BookOpen size={56} className={`${theme.text} opacity-20`} />
                                                    </div>
                                                )}

                                                {/* Level Badge */}
                                                <div className="absolute top-5 right-5 z-20">
                                                    <span className="px-4 py-2 bg-gray-950/90 backdrop-blur-xl rounded-full text-xs font-black border border-gray-800/50 flex items-center shadow-2xl uppercase tracking-widest text-gray-200">
                                                        <BarChart className="w-3 h-3 text-yellow-400 mr-2" />
                                                        {course.level || 'All Levels'}
                                                    </span>
                                                </div>

                                                {/* Floating Stats */}
                                                <div className="absolute bottom-5 left-5 z-20 flex gap-3">
                                                    <span className="px-3 py-1.5 bg-gray-950/90 backdrop-blur-xl rounded-full text-xs font-bold border border-gray-800/50 flex items-center shadow-lg">
                                                        <Clock className="w-3 h-3 mr-1.5 text-gray-400" />
                                                        {course.duration || '6 Weeks'}
                                                    </span>
                                                    <span className="px-3 py-1.5 bg-gray-950/90 backdrop-blur-xl rounded-full text-xs font-bold border border-gray-800/50 flex items-center shadow-lg">
                                                        <Star className="w-3 h-3 mr-1.5 text-yellow-400" fill="currentColor" />
                                                        4.8
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-8 flex-grow flex flex-col">
                                                <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors line-clamp-2 leading-tight min-h-[3.5rem]">
                                                    {course.title}
                                                </h3>

                                                <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed font-medium flex-grow">
                                                    {course.description}
                                                </p>

                                                {/* Enrollment Stats */}
                                                <div className="flex items-center gap-4 mb-6 text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <TrendingUp size={14} className="mr-1.5" />
                                                        1,240+ enrolled
                                                    </span>
                                                </div>

                                                {/* Action Button */}
                                                <button
                                                    onClick={() => navigate(`/course/${course.id}`)}
                                                    className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${theme.buttonGradient} opacity-90 group-hover:opacity-100 transition-all flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-${theme.color}-500/20 transform group-hover:translate-y-[-2px] group-hover:scale-[1.02]`}
                                                >
                                                    View Course Details <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="col-span-full text-center py-20"
                                >
                                    <div className="bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] p-16 border border-gray-800/50 max-w-2xl mx-auto">
                                        <BookOpen className={`${theme.text} mx-auto mb-6`} size={64} />
                                        <h3 className="text-2xl font-black mb-4">No courses found</h3>
                                        <p className="text-gray-400 mb-8">
                                            {searchQuery ? `No courses match "${searchQuery}"` : `No ${filterLevel === 'all' ? '' : filterLevel} courses available for ${streamName} yet.`}
                                        </p>
                                        {(searchQuery || filterLevel !== 'all') && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setFilterLevel('all');
                                                }}
                                                className={`px-8 py-4 rounded-2xl font-bold bg-gradient-to-r ${theme.buttonGradient} text-white`}
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default StreamPage;
