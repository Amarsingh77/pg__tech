import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Clock, BarChart, BookOpen, Share2, Star } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import SyllabusDownloadModal from '../components/ui/SyllabusDownloadModal';

const getTheme = (id) => {
    if (id?.startsWith('me-')) {
        return {
            text: 'text-orange-400',
            bg: 'bg-orange-600',
            bgHover: 'hover:bg-orange-700',
            border: 'border-orange-500',
            ring: 'ring-orange-500',
            gradientText: 'from-orange-400 via-red-400 to-yellow-400',
            gradientBg: 'from-orange-900/40 to-red-900/20',
            buttonGradient: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
            icon: 'text-orange-400',
            lightBg: 'bg-orange-900/20',
            lightBorder: 'border-orange-500/30'
        };
    } else if (id?.startsWith('ce-')) {
        return {
            text: 'text-emerald-400',
            bg: 'bg-emerald-600',
            bgHover: 'hover:bg-emerald-700',
            border: 'border-emerald-500',
            ring: 'ring-emerald-500',
            gradientText: 'from-emerald-400 via-green-400 to-teal-400',
            gradientBg: 'from-emerald-900/40 to-teal-900/20',
            buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
            icon: 'text-emerald-400',
            lightBg: 'bg-emerald-900/20',
            lightBorder: 'border-emerald-500/30'
        };
    }
    // Default to CSE (Blue)
    return {
        text: 'text-blue-400',
        bg: 'bg-blue-600',
        bgHover: 'hover:bg-blue-700',
        border: 'border-blue-500',
        ring: 'ring-blue-500',
        gradientText: 'from-blue-400 via-indigo-400 to-violet-400',
        gradientBg: 'from-blue-900/40 to-indigo-900/20',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        icon: 'text-blue-400',
        lightBg: 'bg-blue-900/20',
        lightBorder: 'border-blue-500/30'
    };
};

const CourseDetail = ({ onEnrollClick }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
    const theme = getTheme(courseId);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.course(courseId));
                if (res.ok) {
                    const response = await res.json();
                    setCourse(response.data || response);
                } else {
                    setCourse(null);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
                setCourse(null);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleDownloadClick = () => {
        if (course.syllabusPdf) {
            setIsSyllabusModalOpen(true);
        } else {
            alert('Curriculum PDF not available for this course yet.');
        }
    };

    const performDownload = () => {
        const link = document.createElement('a');
        link.href = course.syllabusPdf;
        link.download = `${course.title.replace(/\s+/g, '_')}_Curriculum.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Loading Course Details...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute top-0 right-0 w-[60%] h-[60%] rounded-full opacity-10 blur-[150px] ${theme.bg}`} />
            </div>

            <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-10 transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="bg-gray-800 p-2 rounded-lg mr-3 group-hover:bg-gray-700 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="font-medium">Back to Courses</span>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-gray-800 border ${theme.border} ${theme.text} uppercase tracking-wider`}>
                                    {course.stream || 'Engineering'}
                                </span>
                                <span className="flex items-center text-gray-400 text-sm font-medium">
                                    <Clock size={16} className="mr-1.5" /> {course.duration || '6 Months'}
                                </span>
                            </div>

                            <h1 className={`text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                                {course.title}
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl border-l-4 border-gray-700 pl-6 py-2 mb-10">
                                {course.description}
                            </p>

                            {/* What you'll learn */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mb-10 relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.gradientText}`} />
                                <h3 className="text-2xl font-bold mb-8 flex items-center">
                                    <Star className={`mr-3 ${theme.text}`} fill="currentColor" />
                                    What you'll learn
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {course.curriculum && course.curriculum.length > 0 ? (
                                        course.curriculum.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start"
                                            >
                                                <div className={`mt-1 mr-4 p-1 rounded-full ${theme.lightBg}`}>
                                                    <CheckCircle className={`${theme.text}`} size={16} />
                                                </div>
                                                <span className="text-gray-300 font-medium">{item}</span>
                                            </motion.div>
                                        ))
                                    ) : (
                                        [1, 2, 3, 4].map((item, i) => (
                                            <div key={item} className="flex items-start">
                                                <CheckCircle className={`${theme.text} mr-3 mt-1 flex-shrink-0`} size={20} />
                                                <span className="text-gray-300">
                                                    Comprehensive curriculum covering core concepts and advanced techniques.
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <motion.div
                            className="sticky top-28 space-y-8"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Course Card */}
                            <div className={`bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative overflow-hidden group hover:border-${theme.color}-500/50 transition-colors`}>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 relative shadow-lg">
                                    {course.image ? (
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${theme.lightBg}`}>
                                            <BookOpen size={48} className={theme.icon} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>

                                <div className="space-y-4 mb-8 text-sm font-medium">
                                    <div className="flex items-center justify-between text-gray-300 py-2 border-b border-gray-700">
                                        <div className="flex items-center"><Clock size={18} className="mr-3 text-gray-500" /> Duration</div>
                                        <span>{course.duration || '6 Months'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-300 py-2 border-b border-gray-700">
                                        <div className="flex items-center"><BarChart size={18} className="mr-3 text-gray-500" /> Level</div>
                                        <span>{course.level || 'Beginner to Advanced'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-300 py-2 border-b border-gray-700">
                                        <div className="flex items-center"><BookOpen size={18} className="mr-3 text-gray-500" /> Lectures</div>
                                        <span>Click to view</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onEnrollClick(course)}
                                    className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} rounded-xl font-bold text-white text-lg shadow-lg shadow-${theme.color}-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-4`}
                                >
                                    Enroll Now
                                </button>

                                <button
                                    onClick={handleDownloadClick}
                                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl font-semibold transition-colors flex items-center justify-center"
                                >
                                    <Download size={18} className="mr-2" /> Download Syllabus
                                </button>
                            </div>

                            {/* Need Help Card */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700">
                                <h4 className="font-bold text-lg mb-2">Need help deciding?</h4>
                                <p className="text-gray-400 text-sm mb-4">Contact our student counselors for a free consultation.</p>
                                <button className="text-white text-sm font-bold hover:underline flex items-center">
                                    Contact Support <ArrowRight size={14} className="ml-1" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <SyllabusDownloadModal
                isOpen={isSyllabusModalOpen}
                onClose={() => setIsSyllabusModalOpen(false)}
                course={course}
                onDownload={performDownload}
                theme={theme}
            />
        </div>
    );
};

export default CourseDetail;
