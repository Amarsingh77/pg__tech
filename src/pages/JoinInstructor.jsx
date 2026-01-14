import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, CheckCircle, AlertCircle, Briefcase, User, Mail,
    Phone, Linkedin, BookOpen, Star, Target, Users, Zap,
    ArrowRight, Award, GraduationCap, Microscope
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const JoinInstructor = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        experience: '',
        qualifications: '',
        resume: null
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const res = await fetch(API_ENDPOINTS.instructorApply, {
                method: 'POST',
                body: data
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || 'Failed to submit application');

            setStatus({
                type: 'success',
                message: 'Application submitted! We will review your profile and contact you soon.'
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                linkedin: '',
                experience: '',
                qualifications: '',
                resume: null
            });

            // Scroll to status message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const benefits = [
        {
            icon: <Zap className="text-yellow-400" />,
            title: "Impactful Teaching",
            description: "Shape the careers of medical and engineering aspirants with your expertise."
        },
        {
            icon: <Award className="text-blue-400" />,
            title: "Global Recognition",
            description: "Gain visibility in the academic community as a PGtech certified instructor."
        },
        {
            icon: <Users className="text-purple-400" />,
            title: "Expert Community",
            description: "Collaborate with top-tier professionals from diverse technical backgrounds."
        },
        {
            icon: <Target className="text-red-400" />,
            title: "Flexible Opportunities",
            description: "Engage in part-time or full-time roles that suit your professional schedule."
        }
    ];

    const steps = [
        { number: "01", title: "Apply", description: "Submit your resume and academic credentials." },
        { number: "02", title: "Review", description: "Our academic committee reviews your profile." },
        { number: "03", title: "Interview", description: "A technical discussion and demo lecture." },
        { number: "04", title: "Onboard", description: "Join the team and start your teaching journey." }
    ];

    const departments = [
        { name: "Medical (NEET/AIIMS)", icon: <Microscope size={24} />, count: "4 Openings" },
        { name: "Engineering (JEE/GATE)", icon: <GraduationCap size={24} />, count: "6 Openings" },
        { name: "Foundations (9th-12th)", icon: <BookOpen size={24} />, count: "3 Openings" }
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
                                <Star size={14} className="animate-pulse" />
                                We're Hiring Passionate Educators
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                                Transform Education <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                                    With Your Expertise
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                                Join India's fastest-growing technical institute. We're looking for visionary instructors to lead our Medical and Engineering departments.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 group"
                                >
                                    Apply Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-bold border border-gray-700 transition-all">
                                    View Processes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats/Departments Section */}
            <section className="py-20 border-y border-gray-800 bg-gray-900/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {departments.map((dept, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-gray-800/40 rounded-2xl border border-gray-700/50 hover:border-blue-500/40 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                    {dept.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{dept.name}</h3>
                                <p className="text-blue-400 font-medium text-sm">{dept.count}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Teach at PGtech?</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">We provide the platform, the tools, and the community to help you succeed as an educator.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:bg-gray-800/50 transition-colors"
                            >
                                <div className="mb-6 text-2xl">{benefit.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hiring Process */}
            <section className="py-24 bg-blue-600/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Hiring Process</h2>
                        <div className="relative">
                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-[45px] left-0 right-0 h-0.5 bg-gray-800"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                {steps.map((step, index) => (
                                    <div key={index} className="text-center group">
                                        <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-gray-800 flex items-center justify-center text-blue-400 font-bold mx-auto mb-6 group-hover:border-blue-600 transition-all">
                                            {step.number}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                        <p className="text-gray-400 text-sm">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section id="apply-form" className="py-24 bg-gray-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Ready to make <br />an impact?</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Fill out the form and our recruitment team will get back to you within 48 hours. Please ensure your LinkedIn profile and resume are up to date.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email Us</p>
                                        <p className="text-gray-300">hr@pgtechsolutions.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
                                    <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Call Us</p>
                                        <p className="text-gray-300">+91 97711-20412</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl"
                        >
                            <AnimatePresence>
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`mb-8 p-4 rounded-xl flex items-start gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                                    >
                                        {status.type === 'success' ? <CheckCircle size={20} className="shrink-0 mt-1" /> : <AlertCircle size={20} className="shrink-0 mt-1" />}
                                        <p className="text-sm font-medium">{status.message}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                                placeholder="+91 00000 00000"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">LinkedIn</label>
                                        <div className="relative">
                                            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input
                                                type="url"
                                                name="linkedin"
                                                value={formData.linkedin}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Experience</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="e.g. 5+ years teaching Physics"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Expertise</label>
                                    <textarea
                                        name="qualifications"
                                        value={formData.qualifications}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium h-32 resize-none"
                                        placeholder="Tell us about your subject expertise and teaching style..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="p-1">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="resume-input"
                                        required
                                    />
                                    <label
                                        htmlFor="resume-input"
                                        className={`group w-full flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${formData.resume ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700 hover:border-blue-500 bg-gray-800 hover:bg-gray-800/80'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.resume ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400 group-hover:bg-blue-600/20 group-hover:text-blue-400'}`}>
                                            <Upload size={24} />
                                        </div>
                                        <div className="text-center">
                                            <p className={`font-bold ${formData.resume ? 'text-green-400' : 'text-gray-300'}`}>
                                                {formData.resume ? formData.resume.name : 'Upload Your Resume'}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1 font-medium">Supporting PDF files up to 10MB</p>
                                        </div>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Application <ArrowRight size={22} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JoinInstructor;
