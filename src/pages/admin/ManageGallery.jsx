
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Upload } from 'lucide-react';
import ImageUpload from '../../components/ui/ImageUpload';
import { API_ENDPOINTS } from '../../config/api';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Festivals',
        image: null
    });

    const fetchGallery = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.gallery);
            if (!res.ok) throw new Error('Failed to fetch gallery');
            const data = await res.json();
            setImages(Array.isArray(data) ? data : (data.data || []));
        } catch (error) {
            console.error('Error fetching gallery:', error);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await fetch(API_ENDPOINTS.gallery, {
                method: 'POST',
                body: data // No Content-Type header needed, browser sets it for FormData
            });
            fetchGallery();
            closeModal();
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await fetch(API_ENDPOINTS.galleryItem(id), { method: 'DELETE' });
                fetchGallery();
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };

    const openModal = () => {
        setFormData({
            title: '',
            category: 'Festivals',
            image: null
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Manage Gallery</h2>
                <button
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Image
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="group relative rounded-xl overflow-hidden aspect-square border border-gray-700">
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <h4 className="text-white font-bold truncate">{img.title}</h4>
                            <span className="text-xs text-blue-400">{img.category}</span>
                            <button
                                onClick={() => handleDelete(img.id)}
                                className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl my-8 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Add New Image</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Festivals">Festivals</option>
                                    <option value="Certifications">Certifications</option>
                                    <option value="Achievements">Achievements</option>
                                </select>
                            </div>
                            <div>
                                <ImageUpload
                                    onImageSelect={(file) => setFormData({ ...formData, image: file })}
                                    currentImage={null}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                Upload to Gallery
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGallery;
