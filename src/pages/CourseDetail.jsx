import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckCircle, Clock, BarChart } from 'lucide-react';
import { getCourseById } from '../data/courseDetails';

const getTheme = (id) => {
    if (id?.startsWith('me-')) {
        return {
            text: 'text-orange-400',
            bg: 'bg-orange-600',
            bgHover: 'hover:bg-orange-700',
            border: 'border-orange-500',
            gradientText: 'from-orange-400 to-red-500',
            buttonGradient: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
            icon: 'text-orange-400',
            lightBg: 'bg-orange-900/20',
            lightBorder: 'border-orange-500/30'
        };
    } else if (id?.startsWith('ce-')) {
        return {
            text: 'text-green-400',
            bg: 'bg-green-600',
            bgHover: 'hover:bg-green-700',
            border: 'border-green-500',
            gradientText: 'from-green-400 to-emerald-500',
            buttonGradient: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
            icon: 'text-green-400',
            lightBg: 'bg-green-900/20',
            lightBorder: 'border-green-500/30'
        };
    }
    // Default to CSE (Blue)
    return {
        text: 'text-blue-400',
        bg: 'bg-blue-600',
        bgHover: 'hover:bg-blue-700',
        border: 'border-blue-500',
        gradientText: 'from-blue-400 to-purple-500',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        icon: 'text-blue-400',
        lightBg: 'bg-blue-900/20',
        lightBorder: 'border-blue-500/30'
    };
};

import SyllabusDownloadModal from '../components/ui/SyllabusDownloadModal';

const CourseDetail = ({ onEnrollClick }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
    const theme = getTheme(courseId);

    useEffect(() => {
        const foundCourse = getCourseById(courseId);
        setCourse(foundCourse);
    }, [courseId]);

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Course Not Found</h2>
                <Link to="/" className={`text-blue-400 hover:text-blue-300 flex items-center`}>
                    <ArrowLeft className="mr-2" /> Back to Home
                </Link>
            </div>
        );
    }

    const handleDownloadClick = () => {
        if (course.details?.syllabusPdf) {
            setIsSyllabusModalOpen(true);
        } else {
            alert('Curriculum PDF not available for this course yet.');
        }
    };

    const performDownload = () => {
        const link = document.createElement('a');
        link.href = course.details.syllabusPdf;
        link.download = `${course.title.replace(/\s+/g, '_')}_Curriculum.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="pt-24 pb-16 bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto px-6">
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <ArrowLeft className="mr-2" size={20} /> Back
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText}`}>
                                {course.title}
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                {course.desc}
                            </p>

                            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-10">
                                <h3 className="text-2xl font-bold mb-6">What you'll learn</h3>
                                <ul className="space-y-4">
                                    {course.details?.curriculum ? (
                                        course.details.curriculum.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className={`${theme.text} mr-3 mt-1 flex-shrink-0`} size={20} />
                                                <span className="text-gray-300">{item}</span>
                                            </li>
                                        ))
                                    ) : (
                                        [1, 2, 3, 4].map((item) => (
                                            <li key={item} className="flex items-start">
                                                <CheckCircle className={`${theme.text} mr-3 mt-1 flex-shrink-0`} size={20} />
                                                <span className="text-gray-300">
                                                    Comprehensive curriculum covering all aspects of {course.title}.
                                                    Real-world projects and hands-on experience included.
                                                </span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            <div className={`${theme.lightBg} rounded-2xl p-8 border ${theme.lightBorder}`}>
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Course Curriculum</h3>
                                        <p className="text-gray-400">Download the detailed syllabus PDF</p>
                                    </div>
                                    <button
                                        onClick={handleDownloadClick}
                                        className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors border border-gray-600"
                                    >
                                        <Download className="mr-2" size={20} />
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 sticky top-28"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center mb-6">
                                <course.icon size={48} className={theme.icon} />
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center text-gray-300">
                                    <Clock className="mr-3 text-gray-500" size={20} />
                                    <span>Duration: {course.details?.duration || '6 Months'}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <BarChart className="mr-3 text-gray-500" size={20} />
                                    <span>Level: {course.details?.level || 'Beginner to Advanced'}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onEnrollClick(course)}
                                className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02]`}
                            >
                                Enroll Now
                            </button>
                            <p className="text-center text-gray-500 text-sm mt-4">
                                Limited seats available for next batch
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <SyllabusDownloadModal
                isOpen={isSyllabusModalOpen}
                onClose={() => setIsSyllabusModalOpen(false)}
                course={course}
                onDownload={performDownload}
            />
        </div>
    );
};

export default CourseDetail;
