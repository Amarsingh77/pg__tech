import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';

const ViewEnrollments = () => {
    const { token } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const res = await fetch(API_ENDPOINTS.enrollments, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch enrollments');
                const data = await res.json();
                setEnrollments(Array.isArray(data) ? data : (data.data || []));
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };
        fetchEnrollments();
    }, [token]);

    const filteredEnrollments = enrollments.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-white">Student Enrollments</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
                            <tr>
                                <th className="p-4">Student Name</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Course/Batch</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredEnrollments.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-700/50">
                                    <td className="p-4 font-medium text-white">
                                        {student.name}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-blue-400" />
                                                {student.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-green-400" />
                                                {student.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-gray-700 px-2 py-1 rounded text-sm text-white">
                                            {student.course}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(student.id).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                                            Confirmed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredEnrollments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No enrollments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewEnrollments;
