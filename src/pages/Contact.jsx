import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader, User, MessageSquare, Briefcase } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import SEO from '../components/utils/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.enquiries, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'contact',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    data: {
                        subject: formData.subject,
                        message: formData.message
                    }
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 5000);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-gray-900/50 border border-gray-700 rounded-xl px-5 py-4 text-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-600";
    const labelClasses = "block text-gray-400 text-sm font-bold mb-2 ml-1 uppercase tracking-wider";

    return (
        <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pt-28 pb-20">
            <SEO
                title="Contact Us"
                description="Get in touch with PG Tech for inquiries about our courses, software solutions, or any other questions. We're here to help you build your future."
                keywords="contact pg tech, tech institute contact, software company punjab, address, phone number, email"
                url="/contact"
            />
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                        Get In Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                        Let's Start a Conversation.
                    </h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        Have a project in mind or want to learn more about our courses? We're here to help you build your future.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info & Map */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

                            <div className="group flex items-start p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300">
                                <div className="p-4 bg-blue-500/20 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                                    <Mail className="text-blue-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                                    <p className="text-gray-400 mb-2">For general inquiries and support</p>
                                    <a href="mailto:info@pgtech.com" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">info@pgtech.com</a>
                                </div>
                            </div>

                            <div className="group flex items-start p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl hover:border-purple-500/30 hover:bg-gray-800/50 transition-all duration-300">
                                <div className="p-4 bg-purple-500/20 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                                    <Phone className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                                    <p className="text-gray-400 mb-2">Mon-Fri from 9am to 6pm</p>
                                    <a href="tel:+919876543210" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">+91 987 654 3210</a>
                                </div>
                            </div>

                            <div className="group flex items-start p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl hover:border-green-500/30 hover:bg-gray-800/50 transition-all duration-300">
                                <div className="p-4 bg-green-500/20 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                                    <MapPin className="text-green-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                                    <p className="text-gray-400">
                                        SCO 54, Eco City,<br />
                                        New Chandigarh, Punjab, India
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="h-[300px] w-full rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl relative group"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors pointer-events-none z-10" />
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109741.02912911311!2d76.7794179151241!3d30.7333148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff47f55f0f6128!2sChandigarh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Location Map"
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>
                    </div>

                    {/* Dynamic Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-gray-800 shadow-2xl relative overflow-hidden">
                            {/* Decorative gradient blob inside form card */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

                            <h2 className="text-3xl font-black mb-2 relative z-10">Send a Message</h2>
                            <p className="text-gray-400 mb-8 relative z-10">Fill out the form below and our team will get back to you shortly.</p>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className={labelClasses}>Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                                placeholder="John Doe"
                                            />
                                            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className={labelClasses}>Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                                placeholder="john@example.com"
                                            />
                                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className={labelClasses}>Phone (Optional)</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={inputClasses}
                                                placeholder="+91 98765 43210"
                                            />
                                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className={labelClasses}>Subject</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className={inputClasses}
                                                placeholder="Course Inquiry"
                                            />
                                            <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className={labelClasses}>Your Message</label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className={`${inputClasses} resize-none`}
                                            placeholder="Tell us about your requirements..."
                                        ></textarea>
                                        <MessageSquare className="absolute right-4 top-6 text-gray-500" size={20} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform flex items-center justify-center gap-2 shadow-lg ${isSuccess
                                        ? 'bg-green-500 text-white cursor-default'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02] active:scale-95 shadow-blue-500/25 hover:shadow-blue-500/40'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <Loader className="animate-spin" size={24} />
                                    ) : isSuccess ? (
                                        <>
                                            <CheckCircle size={24} /> Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
