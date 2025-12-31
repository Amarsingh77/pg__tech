import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState({
        enrollments: 0,
        courses: 0,
        batches: 0,
        testimonials: 0
    });

    useEffect(() => {
        // Fetch stats from backend
        const fetchStats = async () => {
            try {
                const [enrollmentsRes, coursesRes, batchesRes, testimonialsRes] = await Promise.all([
                    fetch(API_ENDPOINTS.enrollments, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(API_ENDPOINTS.courses, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(API_ENDPOINTS.batches, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(API_ENDPOINTS.testimonials, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                // Check if any request failed (e.g. 429 rate limit)
                const responses = [enrollmentsRes, coursesRes, batchesRes, testimonialsRes];
                for (const r of responses) {
                    if (!r.ok) throw new Error('Failed to fetch dashboard data');
                }

                const enrollments = await enrollmentsRes.json();
                const courses = await coursesRes.json();
                const batches = await batchesRes.json();
                const testimonials = await testimonialsRes.json();

                setStats({
                    enrollments: Array.isArray(enrollments) ? enrollments.length : (enrollments.data || []).length || (enrollments.count || 0),
                    courses: Array.isArray(courses) ? courses.length : (courses.data || []).length || (courses.count || 0),
                    batches: Array.isArray(batches) ? batches.length : (batches.data || []).length || (batches.count || 0),
                    testimonials: Array.isArray(testimonials) ? testimonials.length : (testimonials.data || []).length || (testimonials.count || 0)
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Enrollments', value: stats.enrollments, icon: Users, color: 'bg-blue-500' },
        { label: 'Active Courses', value: stats.courses, icon: BookOpen, color: 'bg-purple-500' },
        { label: 'Upcoming Batches', value: stats.batches, icon: Calendar, color: 'bg-green-500' },
        { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'bg-yellow-500' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                                <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
                            </div>
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                        </div>
                        <h3 className="text-gray-400 font-medium">{stat.label}</h3>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Welcome to the Admin Panel</h3>
                <p className="text-gray-400">
                    Use the sidebar to manage your website content. You can add, edit, or delete courses, batches, testimonials, and gallery images.
                    You can also view student enrollments.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
