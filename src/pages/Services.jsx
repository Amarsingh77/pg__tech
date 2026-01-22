import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Code, Smartphone, Globe, BarChart, Server, Shield,
    Zap, CheckCircle, ArrowRight, MessageSquare, Rocket, Layers, PenTool
} from 'lucide-react';
import StartProject from './StartProject';
import SEO from '../components/utils/SEO';

const serviceData = {
    'web-dev': {
        title: 'Modern Web Development',
        subtitle: 'Digital Experiences That Captivate',
        description: 'We simply don\'t build websites; we engineer digital platforms that drive growth. From lightning-fast landing pages to complex enterprise web applications, our solutions are built for speed, scalability, and impact.',
        icon: Globe,
        color: 'from-blue-600 to-cyan-400',
        stats: [
            { label: 'Faster Load Times', value: '40%' },
            { label: 'SEO Improvement', value: '2x' },
            { label: 'User Retention', value: '95%' }
        ],
        features: [
            { icon: Code, title: 'Custom Frontend', desc: 'Pixel-perfect, responsive interfaces using React, Vue, or Next.js.' },
            { icon: Server, title: 'Robust Backend', desc: 'Secure, scalable APIs and microservices architectures.' },
            { icon: Zap, title: 'Performance First', desc: 'Optimized for Core Web Vitals and lightning-fast interactions.' },
            { icon: Layers, title: 'Full-Stack Solutions', desc: 'End-to-end development handling every layer of your stack.' }
        ]
    },
    'app-dev': {
        title: 'Mobile App Development',
        subtitle: 'Power in the Palm of Your Hand',
        description: 'Transform your business with native and cross-platform mobile applications. We build intuitive, high-performance apps for iOS and Android that users love to open again and again.',
        icon: Smartphone,
        color: 'from-purple-600 to-pink-400',
        stats: [
            { label: 'Cross-Platform', value: '100%' },
            { label: '的用户 Rating', value: '4.8+' },
            { label: 'Active Users', value: '1M+' }
        ],
        features: [
            { icon: Smartphone, title: 'iOS & Android', desc: 'Native performance using Swift/Kotlin or Flutter/React Native.' },
            { icon: Shield, title: 'Secure Architecture', desc: 'Enterprise-grade security standards and data protection.' },
            { icon: PenTool, title: 'UI/UX Design', desc: 'Award-winning mobile interfaces designed for engagement.' },
            { icon: Rocket, title: 'Store Deployment', desc: 'Full support for App Store and Play Store launch processes.' }
        ]
    },
    'seo': {
        title: 'SEO & Digital Marketing',
        subtitle: 'Dominate the Search Results',
        description: 'Stop being invisible. Our data-driven SEO strategies propel your brand to the top of search engines, driving organic traffic and converting visitors into loyal customers.',
        icon: BarChart,
        color: 'from-green-500 to-emerald-400',
        stats: [
            { label: 'Traffic Growth', value: '300%' },
            { label: 'Page 1 Rankings', value: '#1' },
            { label: 'ROI Increase', value: '5x' }
        ],
        features: [
            { icon: BarChart, title: 'Technical SEO', desc: 'Deep site audits and optimization for crawler accessibility.' },
            { icon: Globe, title: 'Content Strategy', desc: 'High-value content that ranks and engages your target audience.' },
            { icon: Zap, title: 'Speed Optimization', desc: 'Faster sites rank higher. We minimize load times.' },
            { icon: MessageSquare, title: 'Conversion Rate', desc: 'Optimizing user flows to turn visitors into buyers.' }
        ]
    },
    'other': {
        title: 'Custom Tech Solutions',
        subtitle: 'Solving Impossible Problems',
        description: 'Have a unique challenge? We build bespoke software solutions, from AI integrations to blockchain applications and IoT ecosystems. If you can imagine it, we can build it.',
        icon: Layers,
        color: 'from-orange-500 to-red-400',
        stats: [
            { label: 'Custom Solutions', value: '500+' },
            { label: 'Client Satisfaction', value: '100%' },
            { label: 'Innovation Award', value: 'Top 10' }
        ],
        features: [
            { icon: Server, title: 'Cloud Architecture', desc: 'AWS, Azure, and GCP infrastructure design and management.' },
            { icon: Shield, title: 'Cybersecurity', desc: 'Audits, penetration testing, and security hardening.' },
            { icon: Code, title: 'AI Integration', desc: 'Leveraging LLMs and machine learning for business automation.' },
            { icon: Layers, title: 'Blockchain', desc: 'Smart contracts, DApps, and Web3 integration services.' }
        ]
    }
};

const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
    >
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

const Services = () => {
    const { type } = useParams();

    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const serviceType = type || 'web-dev';

    useEffect(() => {
        if (type !== 'start-project') {
            window.scrollTo(0, 0);
        }
    }, [serviceType, type]);

    if (type === 'start-project') {
        return <StartProject />;
    }

    const data = serviceData[serviceType] || serviceData['web-dev'];

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden selection:bg-blue-500/30">
            <SEO
                title={data.title}
                description={data.description}
                keywords={`${data.title}, ${serviceType}, software services, pg tech services`}
                url={`/services/${serviceType}`}
            />
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-10 blur-[100px]`} />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                <motion.div
                    style={{ y: backgroundY, opacity }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-6 inline-block"
                    >
                        <span className={`px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-medium tracking-wide uppercase bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                            {data.subtitle}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
                    >
                        {data.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10"
                    >
                        {data.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to="/services/start-project"
                            className={`px-8 py-4 rounded-xl bg-gradient-to-r ${data.color} text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                        >
                            Start Your Project <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/gallery"
                            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300"
                        >
                            View Our Work
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10 py-20 bg-gray-900/50 backdrop-blur-sm border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="text-center"
                            >
                                <h3 className={`text-5xl font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-2`}>
                                    {stat.value}
                                </h3>
                                <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
                        <div className={`h-1 w-20 bg-gradient-to-r ${data.color} mx-auto rounded-full`} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.features.map((feature, idx) => (
                            <ServiceCard
                                key={idx}
                                {...feature}
                                delay={idx * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <div className="relative z-10 py-32 bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">How We Work</h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    We don't just write code; we partner with you to solve business problems. Our agile process ensures transparency, speed, and exceptional quality at every step of the journey.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Discovery', desc: 'We dive deep into your goals and user needs.' },
                                        { title: 'Strategy', desc: 'Architecture, design systems, and roadmap planning.' },
                                        { title: 'Development', desc: 'Iterative coding with regular feedback loops.' },
                                        { title: 'Launch', desc: 'Testing, deployment, and post-launch support.' }
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${data.color} flex items-center justify-center shrink-0 mt-1 font-bold text-sm`}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{step.title}</h4>
                                                <p className="text-gray-400 text-sm">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-20 blur-[80px] rounded-full`} />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold mb-4">Why Clients Choose Us?</h3>
                                    {[
                                        'Proven Track Record of Success',
                                        'Dedicated Project Managers',
                                        'Clean, Maintainable Code',
                                        'On-Time & On-Budget Delivery',
                                        'Post-Launch Support & Maintenance'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className="text-green-400 w-5 h-5 shrink-0" />
                                            <span className="text-gray-300">{item}</span>
                                        </div>
                                    ))}

                                    <div className="pt-6 mt-6 border-t border-white/10 text-center">
                                        <p className="text-sm text-gray-500 mb-2">Avg. Client Rating</p>
                                        <div className="flex justify-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>Scale?</span></h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                            Let's build something extraordinary together. Your vision, our expertise.
                        </p>
                        <Link
                            to="/book-consultation"
                            className={`px-10 py-5 rounded-full bg-white text-gray-900 font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl hover:shadow-white/20 inline-flex items-center gap-2`}
                        >
                            <MessageSquare className="w-6 h-6" />
                            Book Free Consultation
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Services;
