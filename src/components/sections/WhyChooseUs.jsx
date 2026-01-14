import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUsData } from '../../data/mockData';

const WhyChooseUs = () => {
    return (
        <section id="why-us" className="py-32 bg-[#030014] text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">PGtech Advantage</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg max-w-4xl mx-auto mb-8 leading-relaxed text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Success isn't an accident; it's engineered. At PG-Tech Solutions, we combine rigorous technical training with real-world application. We don't just prepare you for a job; we prepare you for a career that defines the future.
                    </motion.p>
                    <motion.p
                        className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        From Full Stack Development to Industrial Automation, our expert-led courses are designed to take you from a curious beginner to an industry-ready professional. Join a community of innovators and start building your legacy today.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                    {whyChooseUsData.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-colors duration-500 ${i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'
                                }`}
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon size={28} className="text-white" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
