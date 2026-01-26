import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Loader } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import CSE from './pages/CSE';
import ME from './pages/ME';
import CE from './pages/CE';
import EE from './pages/EE';
import ECE from './pages/ECE';
import Gallery from './pages/Gallery';
import WhyUs from './pages/WhyUs';
import Testimonials from './pages/Testimonials';
import Batches from './pages/Batches';
import CourseDetail from './pages/CourseDetail';
import JoinInstructor from './pages/JoinInstructor';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BookConsultation from './pages/BookConsultation';
import BookDemo from './pages/BookDemo';
import StartProject from './pages/StartProject';

// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import Dashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageBatches from './pages/admin/ManageBatches';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageGallery from './pages/admin/ManageGallery';
import AdminLogin from './pages/admin/AdminLogin';
import AdminOTP from './pages/admin/AdminOTP';
import ResetPassword from './pages/admin/ResetPassword';

// UI Components - Lazy Loaded
const EnrollModal = React.lazy(() => import('./components/ui/EnrollModal'));
const AdvisorModal = React.lazy(() => import('./components/ui/AdvisorModal'));
const ViewEnrollments = React.lazy(() => import('./pages/admin/ViewEnrollments'));
const ViewLeads = React.lazy(() => import('./pages/admin/ViewLeads'));
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings'));

// Wrapper to handle scroll progress bar and modals which need access to state
const AppContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Custom hook for smooth scrolling progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Handlers for AI Advisor Modal
  const openAdvisorModal = () => {
    setIsAdvisorModalOpen(true);
  };

  const closeAdvisorModal = () => {
    setIsAdvisorModalOpen(false);
  };

  return (
    <div className="bg-gray-900 font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 origin-[0%] z-[101]"
        style={{ scaleX }}
      />

      {!isAdminRoute && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home onEnrollClick={handleEnrollClick} onOpenAdvisorModal={openAdvisorModal} />} />
          <Route path="/courses/cse" element={<CSE onEnrollClick={handleEnrollClick} />} />
          <Route path="/courses/me" element={<ME onEnrollClick={handleEnrollClick} />} />
          <Route path="/courses/ce" element={<CE onEnrollClick={handleEnrollClick} />} />
          <Route path="/courses/ee" element={<EE onEnrollClick={handleEnrollClick} />} />
          <Route path="/courses/ece" element={<ECE onEnrollClick={handleEnrollClick} />} />
          <Route path="/services/:type" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/batches" element={<Batches onEnrollClick={handleEnrollClick} />} />
          <Route path="/course/:courseId" element={<CourseDetail onEnrollClick={handleEnrollClick} />} />
          <Route path="/join-instructor" element={<JoinInstructor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/start-project" element={<StartProject />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/verify-otp" element={<AdminOTP />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="batches" element={<ManageBatches />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="enrollments" element={<ViewEnrollments />} />
            <Route path="leads" element={<ViewLeads />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <AnimatePresence>
        {isModalOpen && (
          <Suspense fallback={
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Loader className="animate-spin text-white" size={48} />
            </div>
          }>
            <EnrollModal course={selectedCourse} onClose={closeModal} />
          </Suspense>
        )}
        {isAdvisorModalOpen && (
          <Suspense fallback={
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Loader className="animate-spin text-white" size={48} />
            </div>
          }>
            <AdvisorModal onClose={closeAdvisorModal} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

import ScrollToTop from './components/utils/ScrollToTop';

export default function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <ScrollToTop />
          <AppContent />
        </AuthProvider>
      </HelmetProvider>
    </Router>
  );
}