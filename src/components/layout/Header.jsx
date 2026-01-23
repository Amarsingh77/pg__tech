import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [activeStream, setActiveStream] = useState(null);
    const [coursesByStream, setCoursesByStream] = useState({});

    // Mobile accordion states
    const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setMobileCoursesOpen(false);
        setMobileServicesOpen(false);
    }, [location]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

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

    const services = [
        { title: 'Web Development', href: '/services/web-dev' },
        { title: 'App Development', href: '/services/app-dev' },
        { title: 'SEO Optimization', href: '/services/seo' },
        { title: 'Other Services', href: '/services/other' }
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`${API_ENDPOINTS.courses}?limit=100&active=true`);
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

    // Animation Variants
    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen ? 'bg-transparent' : 'bg-white/10 backdrop-blur-lg border-b border-white/20'
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-50">
                <Link to="/" className="text-2xl font-bold text-white relative z-50">
                    PG-Tech <span className="text-blue-400">Solutions</span>
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
                        <button className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center py-2 group">
                            Courses <ChevronDown size={16} className={`ml-1 transition-transform group-hover:text-blue-400 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-0 pt-2 w-72"
                                >
                                    <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2">
                                        {Object.keys(streamLabels).map((stream) => (
                                            <div
                                                key={stream}
                                                className="relative group/item"
                                                onMouseEnter={() => setActiveStream(stream)}
                                            >
                                                <div className="flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                                                    <span className="font-medium">{streamLabels[stream]}</span>
                                                    <ChevronRight size={14} className="text-gray-500 group-hover/item:text-blue-400 transition-colors" />
                                                </div>

                                                {/* Nested Menu */}
                                                {activeStream === stream && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="absolute left-full top-0 ml-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 overflow-hidden"
                                                    >
                                                        {coursesByStream[stream] && coursesByStream[stream].length > 0 ? (
                                                            coursesByStream[stream].slice(0, 4).map((course) => (
                                                                <Link
                                                                    key={course.id}
                                                                    to={`/course/${course.id}`}
                                                                    className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-l-2 border-transparent hover:border-blue-500"
                                                                >
                                                                    {course.title}
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-3 text-sm text-gray-500 italic">
                                                                No active courses
                                                            </div>
                                                        )}
                                                        <div className="border-t border-white/10 mt-2 pt-2">
                                                            <Link
                                                                to={`/courses/${stream.toLowerCase()}`}
                                                                className="flex items-center justify-center px-4 py-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wide group/more"
                                                            >
                                                                View all {stream}
                                                                <ArrowWrapper />
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Services Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <button className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center py-2 group">
                            Services <ChevronDown size={16} className={`ml-1 transition-transform group-hover:text-blue-400 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-0 pt-2 w-60"
                                >
                                    <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 overflow-hidden">
                                        {services.map((service) => (
                                            <Link
                                                key={service.title}
                                                to={service.href}
                                                className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-l-2 border-transparent hover:border-purple-500"
                                            >
                                                {service.title}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-gray-200 hover:text-white transition-colors duration-300 text-sm font-medium hover:tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all transform flex items-center gap-2 group"
                    >
                        Contact Us
                        <Sparkles size={16} className="text-yellow-300 group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Menu Button - Z-index fixed to stay above menu */}
                <div className="md:hidden relative z-50">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/10"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-gray-950/95 backdrop-blur-2xl z-40 flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-2 pb-10">

                            {/* Mobile Courses Accordion */}
                            <motion.div variants={itemVariants} className="border-b border-white/10 pb-2">
                                <button
                                    onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                                    className="flex items-center justify-between w-full py-4 text-xl font-semibold text-white group"
                                >
                                    <span className="flex items-center gap-3">
                                        <BookOpen size={24} className="text-blue-400" />
                                        Courses
                                    </span>
                                    <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {mobileCoursesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 pb-4 space-y-4">
                                                {Object.keys(streamLabels).map((stream) => (
                                                    <div key={stream} className="space-y-2">
                                                        <div className="text-sm font-semibold text-blue-400 uppercase tracking-wider pl-2 border-l-2 border-blue-500/30">
                                                            {streamLabels[stream]}
                                                        </div>
                                                        <div className="pl-2 space-y-1">
                                                            {coursesByStream[stream] && coursesByStream[stream].length > 0 ? (
                                                                coursesByStream[stream].slice(0, 3).map((course) => (
                                                                    <Link
                                                                        key={course.id}
                                                                        to={`/course/${course.id}`}
                                                                        className="block py-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm"
                                                                    >
                                                                        {course.title}
                                                                    </Link>
                                                                ))
                                                            ) : (
                                                                <div className="text-xs text-gray-600 italic py-1">No active courses</div>
                                                            )}
                                                            <Link
                                                                to={`/courses/${stream.toLowerCase()}`}
                                                                className="block py-2 text-xs font-bold text-blue-400 uppercase hover:text-blue-300"
                                                            >
                                                                View All {stream} &rarr;
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Mobile Services Accordion */}
                            <motion.div variants={itemVariants} className="border-b border-white/10 pb-2">
                                <button
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                    className="flex items-center justify-between w-full py-4 text-xl font-semibold text-white group"
                                >
                                    <span className="flex items-center gap-3">
                                        <Layers size={24} className="text-purple-400" />
                                        Services
                                    </span>
                                    <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {mobileServicesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-9 pb-4 space-y-2">
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.title}
                                                        to={service.href}
                                                        className="block py-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm"
                                                    >
                                                        {service.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Standard Links */}
                            {navLinks.map((link) => (
                                <motion.div variants={itemVariants} key={link.name} className="border-b border-white/5 last:border-0 pointer-events-auto">
                                    <Link
                                        to={link.href}
                                        className="block py-4 text-xl font-medium text-gray-200 hover:text-white transition-colors hover:pl-2"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} className="pt-6">
                                <Link
                                    to="/contact"
                                    className="w-full block text-center py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
                                >
                                    Get In Touch
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

// Helper for desktop menu arrow
const ArrowWrapper = () => (
    <motion.span
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        className="inline-block ml-1"
    >
        <ChevronRight size={12} />
    </motion.span>
);

export default Header;
