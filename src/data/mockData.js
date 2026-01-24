import { Code, Brain, Cloud, Shield, Award, Briefcase, Book, Users } from 'lucide-react';

export const coursesData = [
    {
        id: 1,
        title: 'Advanced Diploma in Full-Stack Engineering',
        icon: Code,
        duration: '2 Semesters',
        level: 'Advanced',
        color: 'from-blue-500 to-indigo-600',
        image: '/images/hologram/full_stack.png',
        description: 'A comprehensive curriculum covering modern software architecture, distributed systems, and full-cycle web development.'
    },
    {
        id: 2,
        title: 'Post-Graduate Program in Data Science',
        icon: Brain,
        duration: '3 Semesters',
        level: 'Post-Graduate',
        color: 'from-purple-500 to-pink-600',
        image: '/images/hologram/dbms.png',
        description: 'Rigorous training in statistical analysis, machine learning algorithms, and big data technologies for predictive modeling.'
    },
    {
        id: 3,
        title: 'Certification in Cloud Architecture',
        icon: Cloud,
        duration: '1 Semester',
        level: 'Professional',
        color: 'from-sky-500 to-cyan-600',
        image: '/images/hologram/cloud.png',
        description: 'Specialized training in designing scalable, resilient, and secure cloud infrastructure on enterprise platforms.'
    },
    {
        id: 4,
        title: 'Diploma in Cybersecurity & InfoSec',
        icon: Shield,
        duration: '2 Semesters',
        level: 'Intermediate',
        color: 'from-red-500 to-orange-600',
        image: '/images/hologram/dsa.png',
        description: 'In-depth study of network security, cryptography, and ethical hacking to safeguard organizational assets.'
    },
];

export const whyChooseUsData = [
    {
        icon: Award,
        title: 'Accredited Curriculum',
        description: 'Our programs are rigorously vetted to meet global academic and industry standards.',
    },
    {
        icon: Briefcase,
        title: 'Industry Integration',
        description: 'Strategic partnerships with leading tech corporations ensure curriculum relevance.',
    },
    {
        icon: Book,
        title: 'Research-Driven Learning',
        description: 'Emphasis on innovation and problem-solving through capstone research projects.',
    },
    {
        icon: Users,
        title: 'Global Alumni Network',
        description: 'Join a distinguished community of graduates leading in top-tier organizations worldwide.',
    },
];

export const testimonialsData = [
    {
        id: 1,
        name: 'Sarah L.',
        course: 'Full-Stack Engineering',
        quote: 'The academic rigor and practical application provided a solid foundation for my career as a Senior Engineer.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 2,
        name: 'Michael B.',
        course: 'Data Science PGP',
        quote: 'The faculty\'s expertise and the research-oriented approach gave me the analytical skills needed for complex data modeling.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 3,
        name: 'Emily K.',
        course: 'Cloud Architecture',
        quote: 'This program bridged the gap between theoretical concepts and enterprise-scale cloud deployment effectively.',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    },
];

export const batchesData = [
    { id: 1, course: 'Full-Stack Engineering', startDate: 'Spring 2026', mode: 'On-Campus' },
    { id: 2, course: 'Data Science PGP', startDate: 'Spring 2026', mode: 'Hybrid' },
    { id: 3, course: 'Cloud Architecture', startDate: 'Winter 2025', mode: 'Online (Live)' },
    { id: 4, course: 'Cybersecurity Diploma', startDate: 'Winter 2025', mode: 'Evening School' },
];
