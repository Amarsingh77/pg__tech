import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import { getThemeByStream } from '../../data/themes';

const UpcomingBatches = ({ onEnrollClick }) => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.batches);
                if (!res.ok) throw new Error('Failed to fetch batches');
                const data = await res.json();
                setBatches(data.data || []);
            } catch (error) {
                console.error('Error fetching batches:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    if (loading || batches.length === 0) {
        return null; // Don't render section if no data
    }
    return (
        <section id="batches" className="py-32 bg-[#030014] text-white relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Admissions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Academic Calendar</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Secure your enrollment for the upcoming academic sessions.
                        Limited seats available for our specialized programs.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid gap-6">
                        {batches.map((batch, i) => {
                            const theme = getThemeByStream(batch.stream);
                            return (
                                <motion.div
                                    key={batch.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex-grow text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                                <h3 className={`text-xl font-bold text-white group-hover:${theme.text} transition-colors`}>
                                                    {batch.course}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.lightBg} ${theme.text} border ${theme.lightBorder} flex items-center`}>
                                                    <CheckCircle2 size={12} className="mr-1" /> Open
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                                                <div className="flex items-center">
                                                    <Calendar size={16} className={`mr-2 ${theme.text}`} />
                                                    {batch.startDate}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock size={16} className="mr-2 text-purple-400" />
                                                    Evening Batch
                                                </div>
                                                <div className="flex items-center">
                                                    <Users size={16} className={`mr-2 ${theme.iconColor}`} />
                                                    {batch.mode}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 w-full md:w-auto">
                                            <button
                                                onClick={() => onEnrollClick(batch)}
                                                className={`w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white font-semibold transition-all shadow-lg shadow-${theme.color}-600/20 flex items-center justify-center`}
                                            >
                                                Enroll Now
                                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default UpcomingBatches;
