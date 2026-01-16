import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Clock, BarChart, BookOpen, Share2, Star, Users, Award, TrendingUp, Calendar } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import SyllabusDownloadModal from '../components/ui/SyllabusDownloadModal';
import SEO from '../components/utils/SEO';

import { getThemeByStream } from '../data/themes';

const CourseDetail = ({ onEnrollClick }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('curriculum');
    const theme = getThemeByStream(course?.stream);

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
        <div className="bg-gray-950 text-white min-h-screen relative overflow-hidden">
            <SEO
                title={course.title}
                description={course.description}
                image={course.image}
                keywords={`${course.title}, ${course.stream}, ${course.level}, course, training`}
                url={`/course/${courseId}`}
            />
            {/* Enhanced Background elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div
                    className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15 blur-[100px] bg-gradient-to-br ${theme.buttonGradient}`}
                />
                <div
                    className={`absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] bg-gradient-to-tr ${theme.buttonGradient}`}
                />
            </div>

            <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
                {/* Breadcrumb Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mb-8 text-sm"
                >
                    <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
                    <span className="text-gray-700">/</span>
                    <Link to={`/courses/${course.stream?.toLowerCase()}`} className="text-gray-500 hover:text-gray-300 transition-colors">{course.stream}</Link>
                    <span className="text-gray-700">/</span>
                    <span className="text-gray-400 font-medium">{course.title}</span>
                </motion.div>

                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-10 transition-all group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="bg-gray-900/50 backdrop-blur-xl p-3 rounded-xl mr-3 border border-gray-800 group-hover:border-gray-700 group-hover:bg-gray-900 transition-all shadow-lg">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="font-bold uppercase tracking-wider text-xs">Back</span>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-10"
                        >
                            {/* Enhanced Hero Section */}
                            <div className="relative">

                                {/* Category Badge & Meta */}
                                <div className="flex flex-wrap items-center gap-4 mb-8 relative z-10">
                                    <span className={`px-6 py-2.5 rounded-full text-xs font-black bg-gradient-to-r ${theme.buttonGradient} uppercase tracking-[0.2em] shadow-2xl shadow-${theme.color}-500/20`}>
                                        {course.stream || 'Engineering'}
                                    </span>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="flex items-center text-gray-400 font-bold">
                                            <Clock size={16} className="mr-2 text-gray-600" /> {course.duration || '6 Months'}
                                        </span>
                                        <span className="flex items-center text-gray-400 font-bold">
                                            <BarChart size={16} className="mr-2 text-gray-600" /> {course.level || 'All Levels'}
                                        </span>
                                    </div>
                                </div>

                                {/* Epic Title */}
                                <h1 className={`relative z-10 text-5xl sm:text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-br ${theme.gradientText} drop-shadow-2xl`}>
                                    {course.title}
                                </h1>

                                {/* Enhanced Description */}
                                <div className="relative mb-10">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${theme.buttonGradient} rounded-full shadow-lg`}></div>
                                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed pl-8 font-medium">
                                        {course.description}
                                    </p>
                                </div>

                                {/* Course Stats Row */}
                                <div className="grid grid-cols-3 gap-4 mb-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="rounded-3xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all group"
                                    >
                                        <Users className={`${theme.text} mb-3`} size={28} />
                                        <div className="text-3xl font-black mb-1">1,240+</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Students Enrolled</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="rounded-3xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all group"
                                    >
                                        <Award className={`${theme.text} mb-3`} size={28} />
                                        <div className="text-3xl font-black mb-1">4.8/5</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Course Rating</div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="rounded-3xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all group"
                                    >
                                        <TrendingUp className={`${theme.text} mb-3`} size={28} />
                                        <div className="text-3xl font-black mb-1">94%</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Completion Rate</div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Tabbed Content Section */}
                            <div className="bg-gray-900/30 backdrop-blur-2xl rounded-[3rem] border border-gray-800/50 overflow-hidden shadow-2xl">
                                {/* Tab Headers */}
                                <div className="flex border-b border-gray-800/50 p-2 bg-gray-900/20 overflow-x-auto no-scrollbar">
                                    {['curriculum', 'overview', 'outcomes'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-none px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                                                ? `bg-gradient-to-r ${theme.buttonGradient} text-white shadow-lg`
                                                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="p-10 md:p-14">
                                    {activeTab === 'curriculum' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <h3 className="text-3xl font-black mb-10 flex items-center tracking-tight">
                                                <BookOpen className={`mr-4 ${theme.text}`} size={32} />
                                                What You'll Learn
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {course.curriculum && course.curriculum.length > 0 ? (
                                                    course.curriculum.map((item, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            className="flex items-start group cursor-pointer"
                                                        >
                                                            <div className={`mt-1 mr-5 p-2 rounded-xl bg-gradient-to-br ${theme.buttonGradient} shadow-md group-hover:scale-110 transition-transform`}>
                                                                <CheckCircle className="text-white" size={18} />
                                                            </div>
                                                            <span className="text-gray-300 font-bold text-base leading-snug group-hover:text-white group-hover:translate-x-1 transition-all">{item}</span>
                                                        </motion.div>
                                                    ))
                                                ) : (
                                                    ['Fundamental Concepts', 'Advanced Techniques', 'Real-world Projects', 'Industry Best Practices'].map((item, i) => (
                                                        <div key={i} className="flex items-start group">
                                                            <div className={`mt-1 mr-5 p-2 rounded-xl bg-gradient-to-br ${theme.buttonGradient} shadow-md`}>
                                                                <CheckCircle className="text-white" size={18} />
                                                            </div>
                                                            <span className="text-gray-300 font-bold text-base group-hover:text-white transition-colors">{item}</span>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'overview' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-3xl font-black mb-8">Course Overview</h3>
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                This comprehensive {course.title} program is designed to equip you with industry-relevant skills and practical knowledge. Through hands-on projects and real-world applications, you'll gain the expertise needed to excel in your career.
                                            </p>
                                            <div className="grid grid-cols-2 gap-6 mt-8">
                                                <div className="bg-gray-800/40 rounded-2xl p-6">
                                                    <Calendar className={`${theme.text} mb-3`} size={24} />
                                                    <h4 className="font-black text-lg mb-2">Duration</h4>
                                                    <p className="text-gray-400">{course.duration}</p>
                                                </div>
                                                <div className="bg-gray-800/40 rounded-2xl p-6">
                                                    <BarChart className={`${theme.text} mb-3`} size={24} />
                                                    <h4 className="font-black text-lg mb-2">Difficulty</h4>
                                                    <p className="text-gray-400">{course.level}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'outcomes' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-3xl font-black mb-8">Learning Outcomes</h3>
                                            <div className="space-y-4">
                                                {[
                                                    'Master core concepts and advanced techniques',
                                                    'Build real-world projects to showcase your skills',
                                                    'Prepare for industry certifications and interviews',
                                                    'Network with peers and industry professionals',
                                                    'Get career guidance and placement support'
                                                ].map((outcome, i) => (
                                                    <div key={i} className="flex items-start bg-gray-800/30 rounded-2xl p-5 hover:bg-gray-800/50 transition-colors">
                                                        <Star className={`${theme.text} mr-4 mt-1 flex-shrink-0`} fill="currentColor" size={20} />
                                                        <span className="text-gray-300 font-medium text-lg">{outcome}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="lg:col-span-4">
                        <motion.div
                            className="sticky top-32 space-y-8"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Premium Course Card with Glassmorphism */}
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${theme.buttonGradient} rounded-[3rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>

                                <div className="relative bg-gray-900/60 backdrop-blur-2xl rounded-[3rem] p-8 border border-gray-800/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                                    {/* Inner glow */}
                                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${theme.buttonGradient} opacity-5 rounded-full blur-3xl`}></div>

                                    {/* Course Image */}
                                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden mb-8 relative shadow-2xl ring-1 ring-gray-800/50">
                                        {course.image ? (
                                            <>
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </>
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900`}>
                                                <BookOpen size={64} className={`${theme.text} opacity-20`} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                                    </div>

                                    {/* Course Details */}
                                    <div className="space-y-5 mb-10">
                                        <div className="flex items-center justify-between text-gray-300 py-4 border-b border-gray-800/50">
                                            <div className="flex items-center font-bold text-sm tracking-tight text-gray-400">
                                                <Clock size={20} className={`mr-4 ${theme.text}`} /> Duration
                                            </div>
                                            <span className="font-black text-sm">{course.duration || '6 Months'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-300 py-4 border-b border-gray-800/50">
                                            <div className="flex items-center font-bold text-sm tracking-tight text-gray-400">
                                                <BarChart size={20} className={`mr-4 ${theme.text}`} /> Level
                                            </div>
                                            <span className="font-black text-sm">{course.level || 'All Levels'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-300 py-4 border-b border-gray-800/50">
                                            <div className="flex items-center font-bold text-sm tracking-tight text-gray-400">
                                                <BookOpen size={20} className={`mr-4 ${theme.text}`} /> Format
                                            </div>
                                            <span className="font-black text-sm">Online • Live</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-300 py-4">
                                            <div className="flex items-center font-bold text-sm tracking-tight text-gray-400">
                                                <Award size={20} className={`mr-4 ${theme.text}`} /> Certificate
                                            </div>
                                            <span className="font-black text-sm">Included</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        <div className="flex items-end gap-3 mb-2">
                                            {course.discountedPrice > 0 ? (
                                                <>
                                                    <span className="text-4xl font-black text-white">₹{course.discountedPrice.toLocaleString()}</span>
                                                    <span className="text-lg text-gray-500 line-through mb-1">₹{course.price.toLocaleString()}</span>
                                                </>
                                            ) : (
                                                <span className="text-4xl font-black text-white">
                                                    {course.price > 0 ? `₹${course.price.toLocaleString()}` : <span className="text-green-400">Free</span>}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => onEnrollClick(course)}
                                            className={`w-full py-5 bg-gradient-to-r ${theme.buttonGradient} rounded-2xl font-black text-white text-lg shadow-2xl shadow-${theme.color}-500/30 transition-all transform hover:scale-[1.02] hover:shadow-${theme.color}-500/50 active:scale-95 flex items-center justify-center gap-3 group/btn`}
                                        >
                                            Enroll Now <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>

                                        <button
                                            onClick={handleDownloadClick}
                                            className="w-full py-4 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center border border-gray-700/50 hover:border-gray-600 backdrop-blur-xl"
                                        >
                                            <Download size={18} className="mr-3 text-gray-500" /> Download Syllabus
                                        </button>

                                        <button className="w-full py-4 bg-transparent hover:bg-gray-800/30 text-gray-400 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center border border-gray-800/50 hover:border-gray-700">
                                            <Share2 size={18} className="mr-3" /> Share Course
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Help Card with Enhanced Design */}
                            <div className="relative group">
                                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-gray-800/50 overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.buttonGradient} opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`} />
                                    <h4 className="font-black text-2xl mb-4 tracking-tight relative z-10">Need Guidance?</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium relative z-10">Talk to our expert counselors and get personalized course recommendations.</p>
                                    <button className={`relative z-10 text-white text-sm font-black hover:tracking-widest transition-all flex items-center gap-2 group-hover:${theme.text}`}>
                                        Book Free Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
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
