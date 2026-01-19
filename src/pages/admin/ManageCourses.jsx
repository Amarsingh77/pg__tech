// ... imports
import { compressImage } from '../../utils/compressImage';

// ... inside component

const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const url = currentCourse
        ? API_ENDPOINTS.course(currentCourse.id)
        : API_ENDPOINTS.courses;

    const method = currentCourse ? 'PUT' : 'POST';

    const data = new FormData();
    // ... append other fields

    if (formData.image instanceof File) {
        try {
            const compressedFile = await compressImage(formData.image);
            data.append('image', compressedFile);
        } catch (err) {
            console.error('Image compression failed, falling back to original', err);
            data.append('image', formData.image);
        }
    } else if (formData.image) {
        // Keep existing URL if it's a string (edit mode without changing image)
        data.append('image', formData.image);
    }

    const ManageCourses = () => {
        const [courses, setCourses] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [currentCourse, setCurrentCourse] = useState(null);
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            duration: '',
            level: 'Beginner',
            stream: 'CSE',
            image: '',
            curriculum: '',
            syllabusPdf: null,
            showOnHomePage: true,
            order: 0,
            price: 0,
            discountedPrice: 0
        });

        const [uploading, setUploading] = useState(false);

        const fetchCourses = async () => {
            try {
                // Fetch all courses (inactive included) with a higher limit for admin view
                const res = await fetch(`${API_ENDPOINTS.courses}?limit=100&active=all`);
                if (!res.ok) throw new Error('Failed to fetch courses');
                const data = await res.json();
                setCourses(Array.isArray(data) ? data : (data.data || []));
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        useEffect(() => {
            fetchCourses();
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setUploading(true);

            const url = currentCourse
                ? API_ENDPOINTS.course(currentCourse.id)
                : API_ENDPOINTS.courses;

            const method = currentCourse ? 'PUT' : 'POST';

            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('duration', formData.duration);
            data.append('level', formData.level);
            data.append('stream', formData.stream);

            // Auto-assign required fields based on stream
            const streamConfig = {
                'CSE': { icon: 'Code', color: 'from-blue-500 to-indigo-600' },
                'ME': { icon: 'Cog', color: 'from-orange-500 to-red-600' },
                'CE': { icon: 'Building', color: 'from-emerald-500 to-teal-600' },
                'EE': { icon: 'Cpu', color: 'from-yellow-500 to-amber-600' },
                'ECE': { icon: 'Cpu', color: 'from-purple-500 to-pink-600' },
                'Other': { icon: 'Book', color: 'from-gray-500 to-slate-600' }
            };

            const config = streamConfig[formData.stream] || streamConfig['Other'];
            data.append('iconName', config.icon);
            data.append('color', config.color);

            // Handle curriculum as JSON string
            const curriculumArray = formData.curriculum.split('\n').filter(line => line.trim() !== '');
            data.append('curriculum', JSON.stringify(curriculumArray));

            if (formData.syllabusPdf instanceof File) {
                data.append('syllabusPdf', formData.syllabusPdf);
            } else if (formData.syllabusPdf) {
                data.append('syllabusPdf', formData.syllabusPdf);
            }
            data.append('showOnHomePage', formData.showOnHomePage);
            data.append('order', formData.order);
            data.append('price', formData.price);
            data.append('discountedPrice', formData.discountedPrice);

            if (formData.image instanceof File) {
                try {
                    const compressedFile = await compressImage(formData.image);
                    data.append('image', compressedFile);
                } catch (err) {
                    console.error('Image compression failed, falling back to original', err);
                    data.append('image', formData.image);
                }
            } else if (formData.image) {
                // Keep existing URL if it's a string (edit mode without changing image)
                data.append('image', formData.image);
            }

            try {
                const res = await fetch(url, {
                    method,
                    body: data
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    const errorMessage = errorData.errors
                        ? errorData.errors.map(e => `${e.field}: ${e.message}`).join('\n')
                        : (errorData.message || 'Failed to save course');
                    throw new Error(errorMessage);
                }

                alert('Course saved successfully!');
                fetchCourses();
                closeModal();
            } catch (error) {
                console.error('Error saving course:', error);
                alert(`Error:\n${error.message}`);
            } finally {
                setUploading(false);
            }
        };

        const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this course?')) {
                try {
                    await fetch(API_ENDPOINTS.course(id), { method: 'DELETE' });
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
                    image: item.image, // Keep existing URL
                    curriculum: Array.isArray(item.curriculum) ? item.curriculum.join('\n') : (item.curriculum || ''),
                    syllabusPdf: item.syllabusPdf || '',
                    order: item.order || 0,
                    price: item.price || 0,
                    discountedPrice: item.discountedPrice || 0
                });
            } else {
                setCurrentCourse(null);
                setFormData({
                    title: '',
                    description: '',
                    duration: '',
                    level: 'Beginner',
                    stream: 'CSE',
                    image: null,
                    curriculum: '',
                    syllabusPdf: null,
                    showOnHomePage: true,
                    order: 0,
                    price: 0,
                    discountedPrice: 0
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

                <div className="space-y-12">
                    {/* Dynamically get all unique streams from courses + default ones */}
                    {[...new Set([...courses.map(c => c.stream), 'CSE', 'ME', 'CE', 'EE'])].map((stream) => {
                        // Filter courses for this stream
                        const streamCourses = courses.filter(c => c.stream === stream);

                        // Skip if no courses and not in our default main list (optional, but keeps UI clean)
                        if (streamCourses.length === 0 && !['CSE', 'ME', 'CE', 'EE'].includes(stream)) return null;

                        const streamConfig = {
                            'CSE': { label: 'Computer Science (CSE)', color: 'blue', border: 'border-blue-500/30', shadow: 'hover:shadow-blue-500/10', badge: 'bg-blue-600/80' },
                            'ME': { label: 'Mechanical Engineering (ME)', color: 'orange', border: 'border-orange-500/30', shadow: 'hover:shadow-orange-500/10', badge: 'bg-orange-600/80' },
                            'CE': { label: 'Civil Engineering (CE)', color: 'emerald', border: 'border-emerald-500/30', shadow: 'hover:shadow-emerald-500/10', badge: 'bg-emerald-600/80' },
                            'EE': { label: 'Electrical Engineering (EE)', color: 'yellow', border: 'border-yellow-500/30', shadow: 'hover:shadow-yellow-500/10', badge: 'bg-yellow-600/80' }
                        };

                        // Fallback config for unknown streams
                        const config = streamConfig[stream] || {
                            label: `${stream} Courses`,
                            color: 'gray',
                            border: 'border-gray-500/30',
                            shadow: 'hover:shadow-gray-500/10',
                            badge: 'bg-gray-600/80'
                        };

                        return (
                            <div key={stream} className="bg-gray-800/40 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-10 bg-${config.color}-500 rounded-full mr-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]`} />
                                        <h3 className="text-2xl font-black text-white tracking-tight">
                                            {config.label}
                                        </h3>
                                        <span className="ml-4 px-3 py-1 bg-gray-700/50 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-600/50">
                                            {Array.isArray(streamCourses) ? streamCourses.length : 0} Courses
                                        </span>
                                    </div>
                                </div>

                                {streamCourses && streamCourses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {streamCourses.map((course) => (
                                            <div key={course.id} className={`group bg-gray-900/50 rounded-2xl overflow-hidden border ${config.border} shadow-2xl flex flex-col transition-all duration-300 ${config.shadow} hover:-translate-y-1`}>
                                                <div className="h-48 bg-gray-800 relative overflow-hidden">
                                                    {course.image ? (
                                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gray-900 border-b border-gray-800">
                                                            <Upload size={32} className="mb-2 opacity-20" />
                                                            <span className="text-xs uppercase tracking-tighter opacity-40 font-bold">No Image</span>
                                                        </div>
                                                    )}

                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                                                    {/* Badges */}
                                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                        <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/10 uppercase tracking-widest">
                                                            {course.level}
                                                        </span>
                                                        {course.showOnHomePage && (
                                                            <span className={`${config.badge} backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest shadow-lg`}>
                                                                Home #{course.order}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="p-6 flex-grow flex flex-col">
                                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors" title={course.title}>{course.title}</h3>
                                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10 leading-relaxed font-medium">{course.description}</p>

                                                    <div className="mt-auto flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full bg-${config.color}-500 animate-pulse`} />
                                                            <span className="text-xs font-black text-gray-300 uppercase tracking-tighter">
                                                                {course.duration}
                                                            </span>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => openModal(course)}
                                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-all border border-transparent hover:border-gray-600 shadow-xl"
                                                                title="Edit Course"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(course.id)}
                                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 shadow-xl"
                                                                title="Delete Course"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl bg-gray-800/30">
                                        <p className="text-gray-500 mb-4">No courses added for {config.label} yet.</p>
                                        <button
                                            onClick={() => {
                                                openModal();
                                                setFormData(prev => ({ ...prev, stream }));
                                            }}
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-center"
                                        >
                                            <Plus size={16} className="mr-1" /> Add {stream} Course
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl my-8 relative">
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="Original Price"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Discounted Price (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="Sale Price"
                                            value={formData.discountedPrice}
                                            onChange={(e) => setFormData({ ...formData, discountedPrice: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Stream</label>
                                    <select
                                        value={formData.stream}
                                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="CSE">Computer Science (CSE)</option>
                                        <option value="ME">Mechanical Engineering (ME)</option>
                                        <option value="CE">Civil Engineering (CE)</option>
                                        <option value="EE">Electrical Engineering (EE)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Curriculum (One item per line)</label>
                                    <textarea
                                        value={formData.curriculum}
                                        onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 h-32 font-mono text-sm"
                                        placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Syllabus PDF URL</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={(e) => setFormData({ ...formData, syllabusPdf: e.target.files[0] })}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                        />
                                        {formData.syllabusPdf && !(formData.syllabusPdf instanceof File) && (
                                            <p className="text-xs text-green-400 mt-1">Current: {formData.syllabusPdf.split('/').pop()}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                                        <input
                                            type="checkbox"
                                            id="showOnHomePage"
                                            checked={formData.showOnHomePage}
                                            onChange={(e) => setFormData({ ...formData, showOnHomePage: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-800"
                                        />
                                        <label htmlFor="showOnHomePage" className="text-sm font-medium text-gray-200 cursor-pointer">
                                            Show on Home Page
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                            placeholder="0"
                                        />
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
                    </div >
                )}
            </div >
        );
    };

    export default ManageCourses;
