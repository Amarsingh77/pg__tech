import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.enquiries, {
                headers: getAuthHeaders()
            });
            const data = await response.json();
            if (data.success) {
                setEnquiries(data.data);
            }
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await fetch(API_ENDPOINTS.enquiry(id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchEnquiries(); // Refresh list
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

        try {
            const response = await fetch(API_ENDPOINTS.enquiry(id), {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setEnquiries(prev => prev.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Error deleting enquiry:', error);
        }
    };

    const filteredEnquiries = enquiries.filter(item => {
        const matchesFilter = filter === 'all' || item.type === filter;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getTypeColor = (type) => {
        switch (type) {
            case 'project': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'demo': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'consultation': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Enquiries & Leads
                </h1>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="all">All Types</option>
                        <option value="project">Project Requests</option>
                        <option value="demo">Demo Classes</option>
                        <option value="consultation">Consultations</option>
                        <option value="contact">Contact Messages</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading enquiries...</div>
            ) : filteredEnquiries.length === 0 ? (
                <div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700">
                    <p className="text-gray-400">No enquiries found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredEnquiries.map((enquiry) => (
                        <motion.div
                            key={enquiry._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeColor(enquiry.type)}`}>
                                        {enquiry.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-white">{enquiry.name}</h3>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(enquiry.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={enquiry.status}
                                        onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                                        className={`text-xs font-bold rounded-lg px-2 py-1 border outline-none cursor-pointer ${enquiry.status === 'new' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                                enquiry.status === 'contacted' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                    'bg-gray-700 text-gray-400 border-gray-600'
                                            }`}
                                    >
                                        <option value="new">New</option>
                                        <option value="read">Read</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(enquiry._id)}
                                        className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Mail size={14} /> {enquiry.email}
                                    </div>
                                    {enquiry.phone && (
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Phone size={14} /> {enquiry.phone}
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic Details Based on Type */}
                                <div className="col-span-1 lg:col-span-2 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                    {enquiry.type === 'project' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-gray-500 block text-xs">Project Type</span>
                                                <span className="font-medium text-blue-300">{enquiry.data.projectType}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs">Budget</span>
                                                <span className="font-medium text-green-300">
                                                    {enquiry.data.currency} {enquiry.data.budget}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs">Timeline</span>
                                                <span className="font-medium">{enquiry.data.timeline}</span>
                                            </div>
                                            <div className="col-span-2 mt-2 pt-2 border-t border-gray-700">
                                                <span className="text-gray-500 block text-xs mb-1">Description</span>
                                                <p className="text-gray-300 italic">{enquiry.data.description}</p>
                                            </div>
                                        </div>
                                    )}

                                    {enquiry.type === 'demo' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-gray-500 block text-xs">Interest</span>
                                                <span className="font-medium text-green-300">{enquiry.data.course}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs">Mode</span>
                                                <span className="font-medium uppercase">{enquiry.data.mode}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs">Preferred Date</span>
                                                <span className="font-medium">{enquiry.data.date}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs">Time</span>
                                                <span className="font-medium">{enquiry.data.time}</span>
                                            </div>
                                        </div>
                                    )}

                                    {enquiry.type === 'consultation' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-gray-500 block text-xs">Topic</span>
                                                <span className="font-medium text-purple-300">{enquiry.data.topic}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-xs">Preferred Date</span>
                                                <span className="font-medium">{enquiry.data.date} {enquiry.data.time}</span>
                                            </div>
                                            {enquiry.data.message && (
                                                <div className="col-span-2 mt-2 pt-2 border-t border-gray-700">
                                                    <span className="text-gray-500 block text-xs mb-1">Message</span>
                                                    <p className="text-gray-300 italic">{enquiry.data.message}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {enquiry.type === 'contact' && (
                                        <div>
                                            <span className="text-gray-500 block text-xs">Subject</span>
                                            <span className="font-medium mb-2 block">{enquiry.data.subject}</span>
                                            <span className="text-gray-500 block text-xs">Message</span>
                                            <p className="text-gray-300 italic">{enquiry.data.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminEnquiries;
