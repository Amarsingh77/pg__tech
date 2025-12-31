// API Configuration
// In production, set VITE_API_URL environment variable to your backend URL
// For local development, it defaults to http://localhost:3001

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
    // Auth
    login: `${API_BASE_URL}/api/auth/login`,
    verifyOtp: `${API_BASE_URL}/api/auth/verify-otp`,
    verify: `${API_BASE_URL}/api/auth/verify`,
    logout: `${API_BASE_URL}/api/auth/logout`,

    // Auth Management
    forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
    changePassword: `${API_BASE_URL}/api/auth/change-password`,
    addAdmin: `${API_BASE_URL}/api/auth/add-admin`,
    admins: `${API_BASE_URL}/api/auth/admins`,

    // Courses
    courses: `${API_BASE_URL}/api/courses`,
    course: (id) => `${API_BASE_URL}/api/courses/${id}`,

    // Batches
    batches: `${API_BASE_URL}/api/batches`,
    batch: (id) => `${API_BASE_URL}/api/batches/${id}`,

    // Testimonials
    testimonials: `${API_BASE_URL}/api/testimonials`,
    testimonial: (id) => `${API_BASE_URL}/api/testimonials/${id}`,

    // Gallery
    gallery: `${API_BASE_URL}/api/gallery`,
    galleryItem: (id) => `${API_BASE_URL}/api/gallery/${id}`,

    // Enrollments
    enrollments: `${API_BASE_URL}/api/enrollments`,

    // Leads
    syllabusLeads: `${API_BASE_URL}/api/leads/syllabus`,
};

export default API_BASE_URL;
