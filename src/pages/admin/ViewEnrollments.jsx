import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Calendar, Trash2, Eye, X, Save, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';

const ViewEnrollments = () => {
    const { token } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteContent, setNoteContent] = useState('');

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
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [token]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`${API_ENDPOINTS.enrollments}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setEnrollments(prev => prev.map(enrollment =>
                    enrollment.id === id ? { ...enrollment, status: newStatus } : enrollment
                ));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enrollment? This action cannot be undone.')) return;

        try {
            const res = await fetch(`${API_ENDPOINTS.enrollments}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setEnrollments(prev => prev.filter(e => e.id !== id));
            } else {
                alert('Failed to delete enrollment');
            }
        } catch (error) {
            console.error('Error deleting enrollment:', error);
            alert('Error deleting enrollment');
        }
    };

    const openDetailsModal = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setNoteContent(enrollment.notes || '');
        setIsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setSelectedEnrollment(null);
        setIsModalOpen(false);
    };

    const saveNotes = async () => {
        if (!selectedEnrollment) return;

        try {
            const res = await fetch(`${API_ENDPOINTS.enrollments}/${selectedEnrollment.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ notes: noteContent })
            });

            if (res.ok) {
                setEnrollments(prev => prev.map(e =>
                    e.id === selectedEnrollment.id ? { ...e, notes: noteContent } : e
                ));
                alert('Notes saved successfully');
                closeDetailsModal();
            } else {
                alert('Failed to save notes');
            }
        } catch (error) {
            console.error('Error saving notes:', error);
            alert('Error saving notes');
        }
    };

    const filteredEnrollments = enrollments.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-400 bg-green-500/20 border-green-500/30';
            case 'Rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
            case 'Completed': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
            default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
        }
    };

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
                                <th className="p-4">Course</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {loading ? (
                                <tr><td colSpan="5" className="p-8 text-center">Loading...</td></tr>
                            ) : filteredEnrollments.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No enrollments found.</td></tr>
                            ) : (
                                filteredEnrollments.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-700/50">
                                        <td className="p-4 font-medium text-white">
                                            {student.name}
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <Calendar size={10} />
                                                {new Date(student.enrollmentDate || student.createdAt).toLocaleDateString()}
                                            </div>
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
                                                {student.courseName || student.course}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={student.status || 'Pending'}
                                                onChange={(e) => handleStatusChange(student.id, e.target.value)}
                                                className={`text-xs font-bold rounded-lg px-2 py-1 border outline-none cursor-pointer ${getStatusColor(student.status || 'Pending')}`}
                                            >
                                                <option value="Pending" className="bg-gray-800 text-gray-300">Pending</option>
                                                <option value="Approved" className="bg-gray-800 text-green-400">Approved</option>
                                                <option value="Rejected" className="bg-gray-800 text-red-400">Rejected</option>
                                                <option value="Completed" className="bg-gray-800 text-blue-400">Completed</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openDetailsModal(student)}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
                                                    title="View Details & Notes"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {isModalOpen && selectedEnrollment && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="text-blue-500" />
                                Enrollment Details
                            </h3>
                            <button onClick={closeDetailsModal} className="text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-semibold">Student Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-gray-400 text-sm block">Full Name</span>
                                            <span className="text-white font-medium text-lg">{selectedEnrollment.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm block">Email Address</span>
                                            <a href={`mailto:${selectedEnrollment.email}`} className="text-blue-400 hover:underline">{selectedEnrollment.email}</a>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm block">Phone Number</span>
                                            <a href={`tel:${selectedEnrollment.phone}`} className="text-green-400 hover:underline">{selectedEnrollment.phone}</a>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-semibold">Course Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-gray-400 text-sm block">Course Name</span>
                                            <span className="text-white font-medium text-lg bg-gray-700/50 px-3 py-1 rounded inline-block">
                                                {selectedEnrollment.courseName || selectedEnrollment.course}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm block">Enrollment Date</span>
                                            <span className="text-white">
                                                {new Date(selectedEnrollment.enrollmentDate || selectedEnrollment.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm block">Current Status</span>
                                            <span className={`inline-block px-2 py-1 rounded text-sm font-bold border ${getStatusColor(selectedEnrollment.status || 'Pending')}`}>
                                                {selectedEnrollment.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <label className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-semibold block">
                                    Admin Notes
                                </label>
                                <textarea
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                    placeholder="Add internal notes about this student..."
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 min-h-[150px]"
                                />
                                <p className="text-xs text-gray-500 mt-2">These notes are only visible to administrators.</p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-700 bg-gray-900/50 flex justify-end gap-3">
                            <button
                                onClick={closeDetailsModal}
                                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveNotes}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
                            >
                                <Save size={18} />
                                Save Notes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewEnrollments;
