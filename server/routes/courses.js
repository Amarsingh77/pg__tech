import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseStats
} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateCourse, validateId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// Public routes
// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', validatePagination, getCourses);

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Public
router.get('/:id', validateId, getCourse);

// Admin only routes
// @route   POST /api/courses
// @desc    Create new course
// @access  Private (Admin)
router.post('/', protect, authorize('admin'), validateCourse, createCourse);

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Admin)
router.put('/:id', protect, authorize('admin'), validateId, validateCourse, updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), validateId, deleteCourse);

// @route   GET /api/courses/stats
// @desc    Get course statistics
// @access  Private (Admin)
router.get('/stats', protect, authorize('admin'), getCourseStats);

export default router;






