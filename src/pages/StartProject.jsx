import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader, Rocket, Code, Smartphone, Brain, Globe, DollarSign, Calendar } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import SEO from '../components/utils/SEO';

const StartProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: 'web-dev',
        budget: '',
        currency: 'USD',
        timeline: '1-3months',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const currencyOptions = {
        'USD': [
            { value: '1k-5k', label: '$1,000 - $5,000' },
            { value: '5k-10k', label: '$5,000 - $10,000' },
            { value: '10k-25k', label: '$10,000 - $25,000' },
            { value: '25k+', label: '$25,000+' }
        ],
        'INR': [
            { value: '50k-3L', label: '₹50,000 - ₹3 Lakhs' },
            { value: '3L-8L', label: '₹3 Lakhs - ₹8 Lakhs' },
            { value: '8L-20L', label: '₹8 Lakhs - ₹20 Lakhs' },
            { value: '20L+', label: '₹20 Lakhs+' }
        ],
        'EUR': [
            { value: '1k-5k', label: '€1,000 - €5,000' },
            { value: '5k-10k', label: '€5,000 - €10,000' },
            { value: '10k-25k', label: '€10,000 - €25,000' },
            { value: '25k+', label: '€25,000+' }
        ],
        'GBP': [
            { value: '1k-5k', label: '£1,000 - £5,000' },
            { value: '5k-10k', label: '£5,000 - £10,000' },
            { value: '10k-20k', label: '£10,000 - £20,000' },
            { value: '20k+', label: '£20,000+' }
        ],
        'AUD': [
            { value: '2k-8k', label: 'A$2,000 - A$8,000' },
            { value: '8k-15k', label: 'A$8,000 - A$15,000' },
            { value: '15k-40k', label: 'A$15,000 - A$40,000' },
            { value: '40k+', label: 'A$40,000+' }
        ],
        'CAD': [
            { value: '2k-8k', label: 'C$2,000 - C$8,000' },
            { value: '8k-15k', label: 'C$8,000 - C$15,000' },
            { value: '15k-40k', label: 'C$15,000 - C$40,000' },
            { value: '40k+', label: 'C$40,000+' }
        ]
    };

    const handleChange = (e) => {
        setFormData(prev => {
            const updates = { ...prev, [e.target.name]: e.target.value };
            // Reset budget selection if currency changes to avoid invalid values
            if (e.target.name === 'currency') {
                updates.budget = currencyOptions[e.target.value][0].value;
            }
            return updates;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.enquiries, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'project',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    data: {
                        projectType: formData.projectType,
                        budget: formData.budget,
                        currency: formData.currency,
                        timeline: formData.timeline,
                        description: formData.description
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
                    projectType: 'web-dev',
                    budget: currencyOptions['USD'][0].value,
                    currency: 'USD',
                    timeline: '1-3months',
                    description: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const services = [
        { id: 'web-dev', name: 'Web Development', icon: Globe },
        { id: 'app-dev', name: 'Mobile App', icon: Smartphone },
        { id: 'ai-ml', name: 'AI & Machine Learning', icon: Brain },
        { id: 'custom', name: 'Custom Software', icon: Code },
    ];

    const inputClasses = "w-full bg-gray-900/50 border border-gray-700 rounded-xl px-5 py-4 text-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium placeholder:text-gray-600";
    const labelClasses = "block text-gray-400 text-sm font-bold mb-2 ml-1 uppercase tracking-wider";

    return (
        <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pt-28 pb-20">
            <SEO
                title="Start Your Project"
                description="Turn your vision into reality with PG Tech. Submit your project requirements for web development, app development, or AI/ML solutions."
                keywords="start project, hire developers, software development services, project estimation, build web app"
                url="/start-project"
            />
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Rocket size={14} /> Start Your Journey
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        Turn Your Vision Into Reality
                    </h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
                        Ready to build something extraordinary? Tell us about your project, and let's create a digital solution that defines your future.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-gray-800 shadow-2xl relative overflow-hidden"
                    >
                        {/* Form Gradient Blob */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            {/* Section: Project Type */}
                            <div className="space-y-4">
                                <label className={labelClasses}>What are you building?</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {services.map((service) => (
                                        <label
                                            key={service.id}
                                            className={`cursor-pointer group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${formData.projectType === service.id
                                                ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/25'
                                                : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500/50 hover:bg-gray-800'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="projectType"
                                                value={service.id}
                                                checked={formData.projectType === service.id}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <service.icon size={28} className={`mb-3 transition-colors ${formData.projectType === service.id ? 'text-white' : 'text-gray-400 group-hover:text-indigo-400'}`} />
                                            <span className={`text-xs font-bold uppercase tracking-wider text-center ${formData.projectType === service.id ? 'text-white' : 'text-gray-400'}`}>
                                                {service.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="name" className={labelClasses}>Your Name</label>
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
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className={labelClasses}>Email Address</label>
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
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="budget" className={labelClasses}>Estimated Budget</label>
                                    <div className="flex gap-3">
                                        <div className="w-1/3 relative">
                                            <select
                                                name="currency"
                                                value={formData.currency}
                                                onChange={handleChange}
                                                className={`${inputClasses} appearance-none cursor-pointer pr-8`}
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="INR">INR (₹)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="AUD">AUD ($)</option>
                                                <option value="CAD">CAD ($)</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">▼</div>
                                        </div>
                                        <div className="w-2/3 relative">
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className={`${inputClasses} appearance-none cursor-pointer`}
                                            >
                                                {currencyOptions[formData.currency || 'USD'].map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="timeline" className={labelClasses}>Desired Timeline</label>
                                    <div className="relative">
                                        <select
                                            id="timeline"
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleChange}
                                            className={`${inputClasses} appearance-none cursor-pointer`}
                                        >
                                            <option value="urgent">Urgent (ASAP)</option>
                                            <option value="1-3months">1 - 3 Months</option>
                                            <option value="3-6months">3 - 6 Months</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className={labelClasses}>Project Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Tell us about the key features, goals, and target audience..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className={`w-full py-5 rounded-2xl font-black text-xl transition-all transform flex items-center justify-center gap-3 shadow-xl ${isSuccess
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:scale-[1.01] active:scale-95 shadow-indigo-500/25 hover:shadow-indigo-500/40'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <Loader className="animate-spin" size={26} />
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle size={26} /> Request Received!
                                    </>
                                ) : (
                                    <>
                                        Launch Project <Rocket size={24} />
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

export default StartProject;
