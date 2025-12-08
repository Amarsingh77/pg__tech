import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Star, Upload } from 'lucide-react';
import ImageUpload from '../../components/ui/ImageUpload';

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

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/testimonials');
            const data = await res.json();
            setTestimonials(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentTestimonial
            ? `http://localhost:3001/api/testimonials/${currentTestimonial.id}`
            : 'http://localhost:3001/api/testimonials';

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
                await fetch(`http://localhost:3001/api/testimonials/${id}`, { method: 'DELETE' });
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((item) => (
                    <div key={item.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Img</div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{item.name}</h4>
                                    <p className="text-xs text-gray-400">{item.role}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-500">
                                <span className="font-bold mr-1">{item.rating}</span>
                                <Star size={16} fill="currentColor" />
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm italic mb-6 flex-grow">"{item.quote}"</p>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                            <button onClick={() => openModal(item)} className="text-blue-400 hover:text-blue-300">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="text-center py-20 text-gray-500 bg-gray-800 rounded-xl border border-gray-700">
                    <p>No testimonials found. Add one to show social proof.</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl">
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
