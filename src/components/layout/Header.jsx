import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Why Us', href: '/why-us' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Batches', href: '/batches' },
        { name: 'Gallery', href: '/gallery' },
    ];

    const courseLinks = [
        { name: 'Computer Science Engineering', path: '/courses/cse' },
        { name: 'Mechanical Engineering', path: '/courses/me' },
        { name: 'Civil Engineering', path: '/courses/ce' },
    ];

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
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center">
                            Courses <ChevronDown size={16} className="ml-1" />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2"
                                >
                                    {courseLinks.map((course) => (
                                        <Link
                                            key={course.name}
                                            to={course.path}
                                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                        >
                                            {course.name}
                                        </Link>
                                    ))}
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
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        <Menu size={28} />
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
                        className="md:hidden bg-white/10 backdrop-blur-lg overflow-hidden"
                    >
                        <div className="flex flex-col items-center px-6 py-4 space-y-4">
                            <div className="w-full text-center">
                                <p className="text-gray-400 mb-2 text-sm font-semibold uppercase">Courses</p>
                                {courseLinks.map((course) => (
                                    <Link
                                        key={course.name}
                                        to={course.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-gray-200 hover:text-white py-1"
                                    >
                                        {course.name}
                                    </Link>
                                ))}
                            </div>
                            <hr className="w-full border-white/10" />
                            {navLinks.map((link) => (
                                link.href === '/' ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-200 hover:text-white transition-colors duration-300 w-full text-center py-2"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-200 hover:text-white transition-colors duration-300 w-full text-center py-2"
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
                                className="w-full text-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg"
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
