import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Image as ImageIcon, Loader, X } from 'lucide-react';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';
import { compressImage } from '../../utils/compressImage';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.gallery, {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            if (data.success) {
                setImages(data.data);
            }
        } catch (err) {
            setError('Failed to fetch images');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    // ... inside component ...

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setUploading(true);
        setError(null);

        try {
            // Compress image before upload
            const compressedFile = await compressImage(selectedFile);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('image', compressedFile);

            const res = await fetch(API_ENDPOINTS.gallery, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Upload failed');

            setImages([data.data, ...images]);
            setIsAddModalOpen(false);
            resetForm();
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const res = await fetch(`${API_ENDPOINTS.gallery}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (res.ok) {
                setImages(images.filter(img => img._id !== id));
            } else {
                alert('Failed to delete image');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setTitle('');
        setCategory('General');
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin text-blue-500" /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Manage Gallery</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={20} />
                    Add Image
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {images.map((img) => (
                    <motion.div
                        key={img._id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group bg-gray-900/40 rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/10"
                    >
                        <div className="aspect-w-16 aspect-h-9 relative h-56 overflow-hidden">
                            <img
                                src={img.image}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handleDelete(img._id)}
                                    className="p-3 bg-red-500/80 hover:bg-red-600 rounded-2xl text-white transition-all transform hover:scale-110 border border-white/10 shadow-xl"
                                    title="Delete Image"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-black text-white text-base tracking-tight truncate mb-3" title={img.title}>
                                {img.title || 'Untitled Image'}
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    {img.category}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add Image Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden border border-gray-700 shadow-xl"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-700">
                                <h2 className="text-xl font-bold text-white">Upload New Image</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Image Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="General">General</option>
                                        <option value="Certifications">Certifications</option>
                                        <option value="Achievements">Achievements</option>
                                        <option value="Festivals">Festivals</option>
                                        <option value="Students">Students</option>
                                        <option value="Campus">Campus</option>
                                        <option value="Events">Events</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Image</label>
                                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                                        <input
                                            type="file"
                                            onChange={handleFileSelect}
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="mx-auto h-40 object-contain rounded" />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-400">
                                                <ImageIcon size={40} className="mb-2" />
                                                <p>Click to upload or drag and drop</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading || !selectedFile}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {uploading ? 'Uploading...' : 'Upload Image'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageGallery;
