import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap, Globe, Award, BookOpen, Briefcase } from 'lucide-react';

const WhyUs = () => {
    const stats = [
        { id: 1, value: '95%', label: 'Placement Rate', icon: Briefcase, color: 'text-green-400' },
        { id: 2, value: '500+', label: 'Hiring Partners', icon: Users, color: 'text-blue-400' },
        { id: 3, value: '20k+', label: 'Alumni Network', icon: Globe, color: 'text-purple-400' },
        { id: 4, value: '50+', label: 'Industry Awards', icon: Award, color: 'text-yellow-400' },
    ];

    const values = [
        {
            id: 1,
            title: 'Innovation First',
            desc: 'We don’t just teach technology; we anticipate the future. Our curriculum is constantly evolving to stay ahead of industry trends.',
            icon: Zap,
            color: 'bg-yellow-500/10 text-yellow-500'
        },
        {
            id: 2,
            title: 'Global Excellence',
            desc: 'Our standards are world-class. We benchmark against the best to ensure you are ready for the global stage.',
            icon: Globe,
            color: 'bg-blue-500/10 text-blue-500'
        },
        {
            id: 3,
            title: 'Community Driven',
            desc: 'Join a vibrant ecosystem of learners, mentors, and industry leaders. Your network is your net worth.',
            icon: Users,
            color: 'bg-purple-500/10 text-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                            Why Choose TechInstitute?
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            More Than an Institute.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                                We Are Your Launchpad.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            In a world of rapid technological change, you need more than just a degree. You need a partner in your success. We bridge the gap between ambition and achievement.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-800/50 backdrop-blur-sm border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className={`mx-auto mb-4 w-8 h-8 ${stat.color}`} />
                                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The principles that drive us to deliver the best education experience possible.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-colors group"
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Journey / Timeline */}
            <section className="py-24 bg-gray-800/30 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey of Impact</h2>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Founded with a vision to democratize high-quality technical education, we started as a small coding bootcamp. Today, we are a premier institute recognized globally for our rigorous curriculum and exceptional outcomes.
                                </p>
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    We believe that talent is universal, but opportunity is not. Our mission is to provide that opportunity to every aspiring technologist.
                                </p>
                                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center">
                                    Join Our Story <Rocket className="ml-2" size={20} />
                                </button>
                            </motion.div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team collaboration"
                                className="relative rounded-2xl shadow-2xl border border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyUs;
