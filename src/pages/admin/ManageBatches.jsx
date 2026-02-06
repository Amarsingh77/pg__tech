import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';

const ManageBatches = () => {
    const [batches, setBatches] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBatch, setCurrentBatch] = useState(null);
    const [formData, setFormData] = useState({
        course: '',
        stream: 'CSE',
        startDate: '',
        time: '',
        days: '',
        mode: 'Online',
        status: 'Upcoming',
        seatsLeft: 20,
        instructor: ''
    });

    const fetchBatches = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.batches);
            if (!res.ok) throw new Error('Failed to fetch batches');
            const data = await res.json();
            setBatches(Array.isArray(data) ? data : (data.data || []));
        } catch (error) {
            console.error('Error fetching batches:', error);
            alert(`Failed into load batches: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentBatch
            ? API_ENDPOINTS.batch(currentBatch.id)
            : API_ENDPOINTS.batches;

        const method = currentBatch ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to save batch');
            }

            alert(currentBatch ? 'Batch updated successfully!' : 'Batch created successfully!');
            fetchBatches();
            closeModal();
        } catch (error) {
            console.error('Error saving batch:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this batch?')) {
            try {
                await fetch(API_ENDPOINTS.batch(id), {
                    method: 'DELETE',
                    headers: getAuthHeaders()
                });
                fetchBatches();
            } catch (error) {
                console.error('Error deleting batch:', error);
            }
        }
    };

    const openModal = (batch = null) => {
        if (batch) {
            setCurrentBatch(batch);
            setFormData(batch);
        } else {
            setCurrentBatch(null);
            setFormData({
                course: '',
                stream: 'CSE',
                startDate: '',
                time: '',
                days: '',
                mode: 'Online',
                status: 'Upcoming',
                seatsLeft: 20,
                instructor: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBatch(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Manage Batches</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Batch
                </button>
            </div>

            <div className="bg-gray-900/40 rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-md shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800/50 border-b border-gray-700/50">
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Course</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Start Date</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Time & Days</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Mode</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {batches.map((batch) => (
                                <tr key={batch.id} className="hover:bg-gray-800/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div>
                                                <p className="font-black text-white text-base tracking-tight">{batch.course}</p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{batch.stream}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                                                <span className="text-[10px] font-black text-blue-400">{batch.startDate.split(' ')[0]}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{batch.startDate}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-gray-200">{batch.time}</p>
                                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{batch.days || 'Mon, Wed, Fri'}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${batch.mode === 'Online'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                            }`}>
                                            {batch.mode}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${batch.status === 'Upcoming' || batch.status === 'Ongoing' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`} />
                                            <span className="text-sm font-bold text-gray-300">{batch.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(batch)}
                                                className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all border border-transparent hover:border-gray-700"
                                                title="Edit Batch"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(batch.id)}
                                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
                                                title="Delete Batch"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {batches.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-24 text-center">
                                        <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
                                            <Edit size={24} className="opacity-10" />
                                        </div>
                                        <p className="font-black text-gray-400 tracking-tight">No active batches</p>
                                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-2">Create one to start enrollment</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl my-8 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {currentBatch ? 'Edit Batch' : 'Add New Batch'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Course Name</label>
                                <input
                                    type="text"
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Stream</label>
                                    <select
                                        value={formData.stream}
                                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="CSE">CSE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Mode</label>
                                    <select
                                        value={formData.mode}
                                        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Oct 15, 2023"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Time</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 10:00 AM"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Instructor</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        value={formData.instructor}
                                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Days</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Mon, Wed, Fri"
                                        value={formData.days}
                                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {currentBatch ? 'Update Batch' : 'Create Batch'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBatches;
