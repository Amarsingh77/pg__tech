import express from 'express';
import {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  approveEnrollment,
  getEnrollmentStats
} from '../controllers/enrollmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateEnrollment, validateId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// Public routes
// @route   POST /api/enrollments
// @desc    Create new enrollment (public endpoint)
// @access  Public
router.post('/', validateEnrollment, createEnrollment);

// Admin only routes
// @route   GET /api/enrollments
// @desc    Get all enrollments
// @access  Private (Admin)
router.get('/', protect, authorize('admin'), validatePagination, getEnrollments);

// @route   GET /api/enrollments/:id
// @desc    Get single enrollment
// @access  Private (Admin)
router.get('/:id', protect, authorize('admin'), validateId, getEnrollment);

// @route   PUT /api/enrollments/:id
// @desc    Update enrollment
// @access  Private (Admin)
router.put('/:id', protect, authorize('admin'), validateId, validateEnrollment, updateEnrollment);

// @route   DELETE /api/enrollments/:id
// @desc    Delete enrollment
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), validateId, deleteEnrollment);

// @route   PATCH /api/enrollments/:id/approve
// @desc    Approve enrollment
// @access  Private (Admin)
router.patch('/:id/approve', protect, authorize('admin'), validateId, approveEnrollment);

// @route   GET /api/enrollments/stats
// @desc    Get enrollment statistics
// @access  Private (Admin)
router.get('/stats', protect, authorize('admin'), getEnrollmentStats);

export default router;






