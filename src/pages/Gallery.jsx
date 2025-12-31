import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Music, Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const tabs = [
        { id: 'all', label: 'All', icon: ImageIcon },
        { id: 'Certifications', label: 'Certifications', icon: Award },
        { id: 'Achievements', label: 'Achievements', icon: Trophy },
        { id: 'Festivals', label: 'Festivals', icon: Music },
    ];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.gallery);
                if (!res.ok) throw new Error('Failed to fetch gallery');
                const data = await res.json();
                setImages(data.data || []);
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const filteredImages = activeTab === 'all'
        ? images
        : images.filter(img => img.category === activeTab);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
            if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, filteredImages.length]);

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
                        {filteredImages.map((item, index) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => openLightbox(index)}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                            >
                                {/* Image Background */}
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                                )}

                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.title}
                                    </h3>
                                    {item.category && (
                                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                            {item.category}
                                        </p>
                                    )}
                                </div>

                                {/* Zoom Icon Overlay */}
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ZoomIn className="text-white" size={20} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredImages.length === 0 && !loading && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No images found in this category.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && filteredImages[currentIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-20"
                        >
                            <X size={28} />
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 md:left-8 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 z-20"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={goToNext}
                            className="absolute right-4 md:right-8 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 z-20"
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Image Container with Frame */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-6xl max-h-[85vh] w-full mx-4 md:mx-12"
                        >
                            {/* Elegant Frame */}
                            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-2 md:p-3 rounded-2xl shadow-2xl border border-white/10">
                                {/* Inner glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-2xl pointer-events-none" />

                                {/* Image */}
                                <img
                                    src={filteredImages[currentIndex].image}
                                    alt={filteredImages[currentIndex].title}
                                    className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                                />

                                {/* Caption Bar */}
                                <div className="mt-3 px-4 pb-2 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white">
                                            {filteredImages[currentIndex].title}
                                        </h3>
                                        <span className="text-sm text-blue-400 font-medium">
                                            {filteredImages[currentIndex].category}
                                        </span>
                                    </div>
                                    <div className="text-gray-500 text-sm font-medium">
                                        {currentIndex + 1} / {filteredImages.length}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Thumbnail Navigation */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-full px-4 overflow-x-auto pb-2 z-20">
                            {filteredImages.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(index);
                                    }}
                                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentIndex
                                        ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/30'
                                        : 'border-transparent opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
