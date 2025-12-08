import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import ImageUpload from '../../components/ui/ImageUpload';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        level: 'Beginner',
        image: null
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/courses');
            const data = await res.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentCourse
            ? `http://localhost:3001/api/courses/${currentCourse.id}`
            : 'http://localhost:3001/api/courses';

        const method = currentCourse ? 'PUT' : 'POST';

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('duration', formData.duration);
        data.append('level', formData.level);
        if (formData.image instanceof File) {
            data.append('image', formData.image);
        } else if (formData.image) {
            // Keep existing URL if it's a string (edit mode without changing image)
            data.append('image', formData.image);
        }

        try {
            await fetch(url, {
                method,
                body: data
            });
            fetchCourses();
            closeModal();
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await fetch(`http://localhost:3001/api/courses/${id}`, { method: 'DELETE' });
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setCurrentCourse(item);
            setFormData({
                ...item,
                image: item.image // Keep existing URL
            });
        } else {
            setCurrentCourse(null);
            setFormData({
                title: '',
                description: '',
                duration: '',
                level: 'Beginner',
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentCourse(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Manage Courses</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg flex flex-col">
                        <div className="h-40 bg-gray-700 relative">
                            {course.image ? (
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                                {course.level}
                            </div>
                        </div>
                        <div className="p-5 flex-grow">
                            <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="text-sm text-blue-400 font-medium">{course.duration}</div>
                        </div>
                        <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
                            <button onClick={() => openModal(course)} className="text-blue-400 hover:text-blue-300">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(course.id)} className="text-red-400 hover:text-red-300">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {currentCourse ? 'Edit Course' : 'Add Course'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 h-24"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 8 Weeks"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Level</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <ImageUpload
                                    onImageSelect={(file) => setFormData({ ...formData, image: file })}
                                    currentImage={currentCourse ? formData.image : null}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {currentCourse ? 'Update Course' : 'Create Course'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourses;
