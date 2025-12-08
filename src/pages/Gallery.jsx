import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Music, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('certifications');

    const tabs = [
        { id: 'certifications', label: 'Certifications', icon: Award },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'festivals', label: 'Festivals', icon: Music },
    ];

    // Placeholder data - replace with real images later
    const galleryData = {
        certifications: [
            { id: 1, title: 'AWS Certified Solutions Architect', date: '2023', color: 'bg-orange-500' },
            { id: 2, title: 'Google Cloud Professional', date: '2023', color: 'bg-blue-500' },
            { id: 3, title: 'Meta Front-End Developer', date: '2022', color: 'bg-blue-600' },
            { id: 4, title: 'IBM Data Science Professional', date: '2022', color: 'bg-indigo-500' },
            { id: 5, title: 'Certified Kubernetes Administrator', date: '2023', color: 'bg-blue-400' },
        ],
        achievements: [
            { id: 1, title: 'Best Tech Startup 2023', desc: 'Awarded by TechCrunch', color: 'bg-yellow-500' },
            { id: 2, title: 'Hackathon Winners', desc: 'Global AI Hackathon', color: 'bg-purple-500' },
            { id: 3, title: 'Top 10 Innovators', desc: 'Forbes Under 30', color: 'bg-green-500' },
            { id: 4, title: 'Patent Granted', desc: 'AI Recommendation System', color: 'bg-red-500' },
        ],
        festivals: [
            { id: 1, title: 'TechFest 2023', desc: 'Annual Technical Symposium', color: 'bg-pink-500' },
            { id: 2, title: 'Cultural Night', desc: 'Music & Dance', color: 'bg-rose-500' },
            { id: 3, title: 'RoboWars', desc: 'Robotics Competition', color: 'bg-slate-500' },
            { id: 4, title: 'CodeNight', desc: '24-hour Coding Marathon', color: 'bg-cyan-500' },
            { id: 5, title: 'Gaming Championship', desc: 'E-Sports Tournament', color: 'bg-violet-500' },
        ]
    };

    return (
        <div className="min-h-screen bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Gallery</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A glimpse into our journey of excellence, celebration, and innovation.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <tab.icon size={18} className="mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {galleryData[activeTab].map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                            >
                                {/* Placeholder Image Background */}
                                <div className={`absolute inset-0 ${item.color} opacity-80 group-hover:scale-110 transition-transform duration-500`} />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.title}
                                    </h3>
                                    {(item.date || item.desc) && (
                                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                            {item.date || item.desc}
                                        </p>
                                    )}
                                </div>

                                {/* Icon Overlay */}
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ImageIcon className="text-white" size={20} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Gallery;
