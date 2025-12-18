import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Calendar, Download, FileText } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const ViewLeads = () => {
    const [leads, setLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.syllabusLeads);
            const data = await res.json();
            // Sort by date descending (newest first)
            const sortedData = Array.isArray(data)
                ? data.sort((a, b) => new Date(b.downloadedAt || b.id) - new Date(a.downloadedAt || a.id))
                : [];
            setLeads(sortedData);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Course', 'Date'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(lead => [
                lead.name,
                lead.email,
                lead.phone,
                lead.courseName,
                new Date(lead.downloadedAt || lead.id).toLocaleDateString()
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `syllabus_leads_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Syllabus Leads</h2>
                    <p className="text-gray-400">Manage and view users who downloaded course syllabus</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        onClick={exportToCSV}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                        title="Export to CSV"
                    >
                        <Download size={20} className="mr-2" />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
                            <tr>
                                <th className="p-4">Lead Name</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Interested Course</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Loading leads...</td>
                                </tr>
                            ) : filteredLeads.length > 0 ? (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-700/50 transition-colors">
                                        <td className="p-4 font-medium text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                                                    {lead.name.charAt(0).toUpperCase()}
                                                </div>
                                                {lead.name}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={14} className="text-blue-400" />
                                                    <a href={`mailto:${lead.email}`} className="hover:text-blue-400 transition-colors">{lead.email}</a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-green-400" />
                                                    <a href={`tel:${lead.phone}`} className="hover:text-green-400 transition-colors">{lead.phone}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white border border-gray-600">
                                                {lead.courseName}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(lead.downloadedAt || lead.id).toLocaleDateString()}
                                                <span className="text-xs text-gray-500">
                                                    {new Date(lead.downloadedAt || lead.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
                                        <FileText size={48} className="mb-4 opacity-20" />
                                        <p className="text-lg">No leads found yet.</p>
                                        <p className="text-sm">Leads will appear here when users download syllabus.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewLeads;
