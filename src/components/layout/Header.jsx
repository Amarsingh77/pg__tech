import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeStream, setActiveStream] = useState(null);
    const [coursesByStream, setCoursesByStream] = useState({});

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Why Us', href: '/why-us' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Batches', href: '/batches' },
        { name: 'Gallery', href: '/gallery' },
    ];

    const streamLabels = {
        'CSE': 'Computer Science Engineering',
        'ME': 'Mechanical Engineering',
        'CE': 'Civil Engineering',
        'EE': 'Electrical Engineering',
        'Other': 'Other Courses'
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.courses);
                if (!res.ok) throw new Error('Failed to fetch courses');
                const data = await res.json();
                const courses = Array.isArray(data) ? data : (data.data || []);

                const grouped = courses.reduce((acc, course) => {
                    const stream = course.stream || 'Other';
                    if (!acc[stream]) acc[stream] = [];
                    acc[stream].push(course);
                    return acc;
                }, {});

                setCoursesByStream(grouped);
            } catch (error) {
                console.error('Error fetching courses for navbar:', error);
            }
        };

        fetchCourses();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            // Reset states when opening menu
            setActiveStream(null);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md"
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">
                    Tech<span className="text-blue-400">Institute</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-6 items-center">
                    {/* Courses Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => {
                            setIsDropdownOpen(false);
                            setActiveStream(null);
                        }}
                    >
                        <button className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center py-2">
                            Courses <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-0 pt-2 w-64"
                                >
                                    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2">
                                        {Object.keys(coursesByStream).length > 0 ? (
                                            Object.keys(coursesByStream).map((stream) => (
                                                <div
                                                    key={stream}
                                                    className="relative group"
                                                    onMouseEnter={() => setActiveStream(stream)}
                                                >
                                                    <div className="flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
                                                        <span>{streamLabels[stream] || stream}</span>
                                                        <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                                                    </div>

                                                    {/* Nested Menu */}
                                                    {activeStream === stream && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className="absolute left-full top-0 ml-1 w-60 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2"
                                                        >
                                                            {coursesByStream[stream].slice(0, 3).map((course) => (
                                                                <Link
                                                                    key={course.id}
                                                                    to={`/course/${course.id}`}
                                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                                >
                                                                    {course.title}
                                                                </Link>
                                                            ))}
                                                            <div className="border-t border-gray-700 mt-2 pt-2">
                                                                <Link
                                                                    to={`/courses/${stream.toLowerCase()}`}
                                                                    className="block px-4 py-2 text-xs font-semibold text-blue-400 hover:text-blue-300 text-center uppercase tracking-wide"
                                                                >
                                                                    Show More
                                                                </Link>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-gray-400 text-sm">Loading courses...</div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {navLinks.map((link) => (
                        link.href === '/' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-200 hover:text-white transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-200 hover:text-white transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                    <motion.a
                        href="/#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg"
                    >
                        Contact Us
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 overflow-y-auto max-h-[80vh]"
                    >
                        <div className="flex flex-col px-6 py-6 space-y-4">
                            <div className="w-full">
                                <p className="text-gray-400 mb-4 text-sm font-semibold uppercase tracking-wider">Courses</p>
                                <div className="space-y-4 pl-2">
                                    {Object.keys(coursesByStream).map((stream) => (
                                        <div key={stream}>
                                            <p className="text-blue-400 font-medium mb-2 text-sm">{streamLabels[stream] || stream}</p>
                                            <div className="pl-4 border-l border-gray-700 space-y-2">
                                                {coursesByStream[stream].map((course) => (
                                                    <Link
                                                        key={course.id}
                                                        to={`/course/${course.id}`}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block text-gray-300 hover:text-white text-sm"
                                                    >
                                                        {course.title}
                                                    </Link>
                                                ))}
                                                <Link
                                                    to={`/courses/${stream.toLowerCase()}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="block text-xs text-blue-500 hover:text-blue-400 mt-2 font-medium"
                                                >
                                                    View All {stream}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="w-full border-gray-700" />

                            {navLinks.map((link) => (
                                link.href === '/' ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-200 hover:text-white transition-colors duration-300 text-lg font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-200 hover:text-white transition-colors duration-300 text-lg font-medium"
                                    >
                                        {link.name}
                                    </a>
                                )
                            ))}
                            <motion.a
                                href="/#contact"
                                onClick={() => setIsMenuOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full text-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg mt-4"
                            >
                                Contact Us
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Header;
