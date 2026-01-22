import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MessageSquare, User, Mail, CheckCircle, Loader, ArrowRight } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import SEO from '../components/utils/SEO';

const BookConsultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        topic: 'general',
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
                    type: 'consultation',
                    name: formData.name,
                    email: formData.email,
                    data: {
                        topic: formData.topic,
                        date: formData.date,
                        time: formData.time,
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
                    date: '',
                    time: '',
                    topic: 'general',
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
                title="Book Consultation"
                description="Schedule a free consultation with our experts. Discuss your career goals and find the right path for your success."
                keywords="book consultation, career counseling, tech mentorship, free consultation, education guidance"
                url="/book-consultation"
            />
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Calendar size={14} /> Schedule a Meeting
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        Book Your Free Consultation
                    </h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        Let's discuss your goals and how we can help you achieve them. Pick a time that works for you.
                    </p>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-gray-800 shadow-2xl relative overflow-hidden"
                    >
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
                                            className={`${inputClasses} pl-12`}
                                            placeholder="John Doe"
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
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
                                            className={`${inputClasses} pl-12`}
                                            placeholder="john@example.com"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="date" className={labelClasses}>Preferred Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClasses} pl-12 appearance-none`}
                                        />
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="time" className={labelClasses}>Preferred Time</label>
                                    <div className="relative">
                                        <select
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClasses} pl-12 appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Select a time</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="13:00">01:00 PM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                        </select>
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="topic" className={labelClasses}>Discussion Topic</label>
                                <div className="relative">
                                    <select
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-12 appearance-none cursor-pointer`}
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="course-guidance">Course Guidance</option>
                                        <option value="project-consultation">Project Consultation</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className={labelClasses}>Additional Details</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Tell us a bit more about what you'd like to discuss..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className={`w-full py-5 rounded-2xl font-black text-xl transition-all transform flex items-center justify-center gap-3 shadow-xl ${isSuccess
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.01] active:scale-95 shadow-blue-500/25 hover:shadow-blue-500/40'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <Loader className="animate-spin" size={26} />
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle size={26} /> Confirmed!
                                    </>
                                ) : (
                                    <>
                                        Schedule Meeting <ArrowRight size={24} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BookConsultation;
