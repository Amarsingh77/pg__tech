import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, User, Mail, CheckCircle, Loader, ArrowRight, Video, MapPin, Phone } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import SEO from '../components/utils/SEO';

const BookDemo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        mode: 'online',
        date: '',
        time: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(''); // Clear error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(API_ENDPOINTS.enquiries, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'demo',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    data: {
                        course: formData.course,
                        mode: formData.mode,
                        date: formData.date,
                        time: formData.time
                    }
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 5000);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    course: '',
                    mode: 'online',
                    date: '',
                    time: ''
                });
            } else {
                console.error('Server Error Response:', data);
                throw new Error(data.message || `Server Error (${response.status}): ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-gray-900/50 border border-gray-700 rounded-xl px-5 py-4 text-gray-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium placeholder:text-gray-600";
    const labelClasses = "block text-gray-400 text-sm font-bold mb-2 ml-1 uppercase tracking-wider";

    return (
        <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pt-28 pb-20">
            <SEO
                title="Book Free Demo"
                description="Experience our teaching methodology with a free demo class. Choose from online or offline modes and start learning today."
                keywords="free demo class, coding demo, trial class, online learning demo, offline class demo"
                url="/book-demo"
            />
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-green-600/10 blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <BookOpen size={14} /> Free Trial Session
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        Experience the Future of Learning
                    </h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        Book a free demo class today. See our teaching methodology in action and find the perfect course for your career goals.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-gray-800 shadow-2xl relative overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            {/* Class Mode Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${formData.mode === 'online'
                                    ? 'bg-green-600 border-green-500 shadow-lg shadow-green-500/25'
                                    : 'bg-gray-800/50 border-gray-700 hover:border-green-500/50 hover:bg-gray-800'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="online"
                                        checked={formData.mode === 'online'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <Video size={24} className={`mb-2 ${formData.mode === 'online' ? 'text-white' : 'text-gray-400'}`} />
                                    <span className={`font-bold ${formData.mode === 'online' ? 'text-white' : 'text-gray-400'}`}>Online Class</span>
                                </label>
                                <label className={`cursor-pointer group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${formData.mode === 'offline'
                                    ? 'bg-green-600 border-green-500 shadow-lg shadow-green-500/25'
                                    : 'bg-gray-800/50 border-gray-700 hover:border-green-500/50 hover:bg-gray-800'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        value="offline"
                                        checked={formData.mode === 'offline'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <MapPin size={24} className={`mb-2 ${formData.mode === 'offline' ? 'text-white' : 'text-gray-400'}`} />
                                    <span className={`font-bold ${formData.mode === 'online' ? 'text-white' : 'text-gray-400'}`}>Offline (Campus)</span>
                                </label>
                            </div>

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
                                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClasses} pl-12`}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="course" className={labelClasses}>Interested Course</label>
                                    <div className="relative">
                                        <select
                                            id="course"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClasses} pl-12 appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Select a course</option>
                                            <option value="web-development">Full Stack Web Development</option>
                                            <option value="data-science">Data Science & AI</option>
                                            <option value="app-development">Mobile App Development</option>
                                            <option value="digital-marketing">Digital Marketing</option>
                                            <option value="cyber-security">Cyber Security</option>
                                            <option value="cloud-computing">Cloud Computing</option>
                                        </select>
                                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
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
                                            <option value="morning">Morning (9AM - 12PM)</option>
                                            <option value="afternoon">Afternoon (12PM - 4PM)</option>
                                            <option value="evening">Evening (4PM - 8PM)</option>
                                        </select>
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className={`w-full py-5 rounded-2xl font-black text-xl transition-all transform flex items-center justify-center gap-3 shadow-xl ${isSuccess
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-[1.01] active:scale-95 shadow-green-500/25 hover:shadow-green-500/40'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <Loader className="animate-spin" size={26} />
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle size={26} /> Spot Reserved!
                                    </>
                                ) : (
                                    <>
                                        Book Free Class <ArrowRight size={24} />
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

export default BookDemo;
