import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

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
        status: 'Open',
        seatsLeft: 20,
        instructor: ''
    });

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.batches);
            const data = await res.json();
            setBatches(data);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentBatch
            ? API_ENDPOINTS.batch(currentBatch.id)
            : API_ENDPOINTS.batches;

        const method = currentBatch ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            fetchBatches();
            closeModal();
        } catch (error) {
            console.error('Error saving batch:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this batch?')) {
            try {
                await fetch(API_ENDPOINTS.batch(id), { method: 'DELETE' });
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
                status: 'Open',
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

            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
                        <tr>
                            <th className="p-4">Course</th>
                            <th className="p-4">Start Date</th>
                            <th className="p-4">Time</th>
                            <th className="p-4">Mode</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {batches.map((batch) => (
                            <tr key={batch.id} className="hover:bg-gray-700/50">
                                <td className="p-4 font-medium text-white">{batch.course}</td>
                                <td className="p-4">{batch.startDate}</td>
                                <td className="p-4">{batch.time}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${batch.mode === 'Online' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        {batch.mode}
                                    </span>
                                </td>
                                <td className="p-4">{batch.status}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => openModal(batch)} className="text-blue-400 hover:text-blue-300">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(batch.id)} className="text-red-400 hover:text-red-300">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {batches.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">No batches found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl">
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
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Instructor</label>
                                <input
                                    type="text"
                                    value={formData.instructor}
                                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
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
