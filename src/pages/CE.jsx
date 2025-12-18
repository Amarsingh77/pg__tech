import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const CE = ({ onEnrollClick }) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.courses);
                const data = await res.json();
                setCourses(data.filter(c => c.stream === 'CE'));
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="pt-24 pb-16 bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 tracking-tight"
                >
                    Civil Engineering
                </motion.h1>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                    Build the infrastructure of tomorrow. Our CE courses cover everything from structural design to construction management.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => navigate(`/course/${course.id}`)}
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition-colors cursor-pointer h-full relative z-10 flex flex-col group"
                        >
                            <div className="mb-6 h-48 overflow-hidden rounded-lg">
                                {course.image ? (
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                        <BookOpen size={40} className="text-green-400" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                            <p className="text-gray-400 mb-6 flex-grow line-clamp-3">{course.description}</p>
                            <span className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors text-white text-center">
                                View Details
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CE;
