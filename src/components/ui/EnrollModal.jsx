import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

// Check icon component for the success message
const Check = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const EnrollModal = ({ course, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!course) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                courseName: course.title || course.course,
                status: 'New',
                enrollmentDate: new Date().toISOString()
            };

            const response = await fetch(API_ENDPOINTS.enrollments, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                // Automatically close after 3 seconds
                setTimeout(() => {
                    onClose();
                    setIsSubmitted(false); // Reset for next time
                }, 3000);
            } else {
                console.error('Enrollment failed:', data.message);
                alert(data.message || 'Failed to submit enrollment');
            }
        } catch (error) {
            console.error('Error submitting enrollment:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl border border-white/10 text-white"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 10 }}
                                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Check size={40} className="text-white" />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-2">Enrollment Submitted!</h3>
                                <p className="text-gray-300">Our team will contact you shortly. This window will close automatically.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <h3 className="text-3xl font-bold mb-2">Enroll Now</h3>
                                <p className="text-lg text-blue-300 mb-6">
                                    {course.title || course.course}
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="+1 (234) 567-890"
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={isSubmitting}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg transition-opacity duration-300 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default EnrollModal;
