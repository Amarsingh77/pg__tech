import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Star, Upload } from 'lucide-react';
import ImageUpload from '../../components/ui/ImageUpload';
import { API_ENDPOINTS } from '../../config/api';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        quote: '',
        rating: 5,
        image: null
    });

    const fetchTestimonials = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.testimonials);
            if (!res.ok) throw new Error('Failed to fetch testimonials');
            const data = await res.json();
            setTestimonials(Array.isArray(data) ? data : (data.data || []));
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentTestimonial
            ? API_ENDPOINTS.testimonial(currentTestimonial.id)
            : API_ENDPOINTS.testimonials;

        const method = currentTestimonial ? 'PUT' : 'POST';

        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('quote', formData.quote);
        data.append('rating', formData.rating);
        if (formData.image instanceof File) {
            data.append('image', formData.image);
        } else if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await fetch(url, {
                method,
                body: data
            });
            fetchTestimonials();
            closeModal();
        } catch (error) {
            console.error('Error saving testimonial:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await fetch(API_ENDPOINTS.testimonial(id), { method: 'DELETE' });
                fetchTestimonials();
            } catch (error) {
                console.error('Error deleting testimonial:', error);
            }
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setCurrentTestimonial(item);
            setFormData({
                ...item,
                image: item.image
            });
        } else {
            setCurrentTestimonial(null);
            setFormData({
                name: '',
                role: '',
                quote: '',
                rating: 5,
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTestimonial(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Manage Testimonials</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((item) => (
                    <div key={item.id} className="group bg-gray-900/40 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/5 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-40 blur-sm transition-opacity" />
                                    <div className="relative w-14 h-14 rounded-full bg-gray-800 overflow-hidden border-2 border-gray-700 group-hover:border-blue-500/50 transition-colors">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-900">
                                                <Upload size={20} className="opacity-20" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-lg tracking-tight group-hover:text-blue-400 transition-colors">{item.name}</h4>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.role}</p>
                                </div>
                            </div>
                            <div className="flex bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700 shadow-inner">
                                <span className="font-black text-yellow-400 mr-1 text-sm">{item.rating}</span>
                                <Star size={14} className="text-yellow-400 self-center" fill="currentColor" />
                            </div>
                        </div>

                        <div className="relative flex-grow">
                            <span className="absolute -top-4 -left-2 text-6xl text-blue-500/10 font-serif leading-none select-none">"</span>
                            <p className="relative z-10 text-gray-300 text-sm italic leading-relaxed font-medium mb-8">
                                {item.quote}
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-800/50">
                            <button
                                onClick={() => openModal(item)}
                                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all border border-transparent hover:border-gray-700"
                                title="Edit Testimonial"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                                title="Delete Testimonial"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="text-center py-24 text-gray-500 bg-gray-900/40 rounded-3xl border border-gray-800 border-dashed backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                        <Star size={24} className="opacity-20" />
                    </div>
                    <p className="font-bold tracking-tight text-gray-400">No testimonials found</p>
                    <p className="text-xs uppercase tracking-widest mt-2 opacity-50">Add one to show social proof</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl my-8 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {currentTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Role</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Quote</label>
                                <textarea
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 h-24"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <ImageUpload
                                        onImageSelect={(file) => setFormData({ ...formData, image: file })}
                                        currentImage={currentTestimonial ? formData.image : null}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {currentTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                            </button>
                        </form>
                    </div >
                </div >
            )}
        </div >
    );
};

export default ManageTestimonials;
