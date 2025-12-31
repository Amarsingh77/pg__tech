import express from 'express';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialStats
} from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateTestimonial, validateId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// Public routes
// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', validatePagination, getTestimonials);

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial
// @access  Public
router.get('/:id', validateId, getTestimonial);

// Admin only routes
// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private (Admin)
router.post('/', protect, authorize('admin'), validateTestimonial, createTestimonial);

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private (Admin)
router.put('/:id', protect, authorize('admin'), validateId, validateTestimonial, updateTestimonial);

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), validateId, deleteTestimonial);

// @route   GET /api/testimonials/stats
// @desc    Get testimonial statistics
// @access  Private (Admin)
router.get('/stats', protect, authorize('admin'), getTestimonialStats);

export default router;







