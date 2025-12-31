import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const SyllabusDownloadModal = ({ isOpen, onClose, course, onDownload, theme }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(API_ENDPOINTS.syllabusLeads, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    message: `Downloaded syllabus for ${course.title}`,
                    source: 'Syllabus Download',
                    courseId: course._id
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit details');
            }

            setSuccess(true);
            setTimeout(() => {
                onDownload();
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({ name: '', email: '', phone: '' });
                }, 2000);
            }, 1000);

        } catch (err) {
            console.error('Lead submission error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className={`p-6 border-b border-gray-700 bg-gradient-to-r ${theme.gradientBg} relative overflow-hidden`}>
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl transform translate-x-10 -translate-y-10 ${theme.bg}`} />
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Download Syllabus</h3>
                                    <p className="text-sm text-gray-300 flex items-center">
                                        <FileText size={14} className="mr-1" />
                                        {course.title}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {success ? (
                                <div className="text-center py-8">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme.bg}/20 mb-4`}>
                                        <CheckCircle className={`w-8 h-8 ${theme.text}`} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Success!</h4>
                                    <p className="text-gray-400">Your download will start shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="bg-gray-700/30 p-4 rounded-xl text-sm text-gray-300 mb-4 border border-gray-700/50">
                                        Please provide your contact details to download the comprehensive curriculum PDF for this course.
                                    </div>

                                    {error && (
                                        <div className="bg-red-900/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg flex items-start">
                                            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-600"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3.5 mt-2 bg-gradient-to-r ${theme.buttonGradient} text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 flex items-center justify-center`}
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Download className="w-5 h-5 mr-2" />
                                                Get Syllabus PDF
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SyllabusDownloadModal;
