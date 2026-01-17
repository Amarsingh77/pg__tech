import React, { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { ArrowRight, Code, Brain, Cloud } from 'lucide-react';

const HeroSection = ({ onOpenAdvisorModal }) => {
    // Animation variants for the card stack
    const cardVariants = {
        initial: { rotate: 0, y: 0, x: 0, opacity: 0, scale: 0.8 },
        animate: (i) => ({
            rotate: i * -5 + 10,
            y: i * -15,
            x: i * 15,
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.5 + i * 0.2,
                duration: 0.5,
                ease: 'easeOut',
            },
        }),
    };

    const cards = [
        { icon: Code, text: 'Web Development', color: 'bg-blue-500' },
        { icon: Brain, text: 'Data Science', color: 'bg-purple-500' },
        { icon: Cloud, text: 'Cloud Computing', color: 'bg-sky-500' },
    ];

    return (
        <section className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left flex flex-col items-center md:items-start"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                        Master The Future.
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                            Define Your Legacy.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto md:mx-0">
                        Don't just adapt to the future—create it. Our immersive, hands-on training in AI, Engineering, and Development transforms ambitious learners into industry-ready professionals. Your journey to excellence starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto justify-center md:justify-start">
                        <motion.a
                            href="#courses"
                            whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px -5px rgba(99, 102, 241, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg text-center w-full sm:w-auto"
                        >
                            Explore Courses
                            <ArrowRight className="inline-block ml-2" size={20} />
                        </motion.a>
                        <motion.button
                            onClick={onOpenAdvisorModal}
                            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#4f46e5' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow-lg text-center transition-colors duration-300 w-full sm:w-auto"
                        >
                            ✨ Find Your Path
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Animated Stack */}
                <div className="hidden md:flex items-center justify-center relative h-96">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            className={`absolute w-64 h-40 ${card.color} rounded-xl shadow-2xl p-6 flex flex-col justify-between items-start border border-white/20`}
                            style={{ transformOrigin: 'bottom left' }}
                        >
                            <card.icon size={40} className="text-white/80" />
                            <span className="text-2xl font-bold text-white">{card.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-6 mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col md:flex-row justify-around items-center bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-lg"
                >
                    <StatItem end={20000} suffix="+" label="Students Trained" />
                    <StatItem end={95} suffix="%" label="Placement Rate" />
                    <StatItem end={500} suffix="+" label="Industry Partners" />
                </motion.div>
            </div>
        </section>
    );
};

// Helper component for animated stats
const StatItem = ({ end, suffix, label }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Intersection Observer to trigger animation on view
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animate(0, end, {
                        duration: 2,
                        ease: "easeOut",
                        onUpdate(latest) {
                            setDisplayValue(Math.floor(latest));
                        }
                    });
                    observer.unobserve(node); // Animate only once
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [end]);


    return (
        <div ref={ref} className="text-center my-4 md:my-0">
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                {displayValue}{suffix}
            </span>
            <p className="text-lg text-gray-300 mt-2">{label}</p>
        </div>
    );
};

export default HeroSection;
