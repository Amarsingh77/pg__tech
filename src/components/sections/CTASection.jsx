import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const CTASection = () => {
    return (
        <section id="contact" className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Ready to Start Your Tech Career?
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Don't wait. The future is digital. Get in touch with our career counselors today to find the perfect course for you.
                </motion.p>
                <Link to="/book-demo">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px -5px rgba(255, 255, 255, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-white text-blue-600 font-extrabold rounded-lg shadow-2xl text-lg flex items-center gap-3 mx-auto"
                    >
                        Book a Free Demo Class
                        <Send size={22} />
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default CTASection;
