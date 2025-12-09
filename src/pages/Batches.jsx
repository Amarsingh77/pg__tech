import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Filter, ArrowRight, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Batches = ({ onEnrollClick }) => {
    const [filterCourse, setFilterCourse] = useState('All');
    const [filterMode, setFilterMode] = useState('All');
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.batches);
                const data = await res.json();
                setBatches(data);
            } catch (error) {
                console.error('Error fetching batches:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const filteredBatches = batches.filter(batch => {
        const matchCourse = filterCourse === 'All' || batch.stream === filterCourse;
        const matchMode = filterMode === 'All' || batch.mode === filterMode;
        return matchCourse && matchMode;
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20 pb-12">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Batches</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Secure your spot in our next cohort. Limited seats available for personalized mentorship.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 sticky top-20 z-30 bg-gray-900/90 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Filter size={20} />
                        <span className="font-medium">Filter by:</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        <select
                            value={filterCourse}
                            onChange={(e) => setFilterCourse(e.target.value)}
                            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="All">All Streams</option>
                            <option value="CSE">CSE</option>
                            <option value="ME">ME</option>
                            <option value="CE">CE</option>
                        </select>
                        <select
                            value={filterMode}
                            onChange={(e) => setFilterMode(e.target.value)}
                            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="All">All Modes</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Batches List */}
            <section className="py-12 container mx-auto px-6">
                <div className="grid gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredBatches.map((batch) => (
                            <motion.div
                                key={batch.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                            >
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${batch.stream === 'CSE' ? 'bg-blue-500/20 text-blue-400' :
                                            batch.stream === 'ME' ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-green-500/20 text-green-400'
                                            }`}>
                                            {batch.stream}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${batch.status === 'Filling Fast' ? 'bg-yellow-500/20 text-yellow-400' :
                                            batch.status === 'Waitlist' ? 'bg-red-500/20 text-red-400' :
                                                'bg-emerald-500/20 text-emerald-400'
                                            }`}>
                                            {batch.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{batch.course}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} className="text-blue-400" />
                                            <span>Starts: {batch.startDate}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} className="text-blue-400" />
                                            <span>{batch.time} ({batch.days})</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} className="text-blue-400" />
                                            <span>{batch.mode}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={16} className="text-blue-400" />
                                            <span>Instructor: {batch.instructor}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-white block">
                                            {batch.seatsLeft > 0 ? batch.seatsLeft : '0'}
                                        </span>
                                        <span className="text-xs text-gray-400">Seats Left</span>
                                    </div>
                                    <button
                                        onClick={() => onEnrollClick && onEnrollClick(batch)}
                                        disabled={batch.seatsLeft === 0}
                                        className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${batch.seatsLeft === 0
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                                            }`}
                                    >
                                        {batch.seatsLeft === 0 ? 'Waitlist' : 'Enroll Now'}
                                        {batch.seatsLeft > 0 && <ArrowRight size={16} />}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredBatches.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No batches found matching your filters.</p>
                        <button
                            onClick={() => { setFilterCourse('All'); setFilterMode('All'); }}
                            className="mt-4 text-blue-400 hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Batches;
