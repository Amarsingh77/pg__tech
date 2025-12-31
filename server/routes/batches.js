import express from 'express';
import {
  getBatches,
  getBatch,
  createBatch,
  updateBatch,
  deleteBatch,
  getUpcomingBatches,
  getBatchStats
} from '../controllers/batchController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBatch, validateId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// Public routes
// @route   GET /api/batches
// @desc    Get all batches
// @access  Public
router.get('/', validatePagination, getBatches);

// @route   GET /api/batches/:id
// @desc    Get single batch
// @access  Public
router.get('/:id', validateId, getBatch);

// @route   GET /api/batches/upcoming
// @desc    Get upcoming batches
// @access  Public
router.get('/upcoming', getUpcomingBatches);

// Admin only routes
// @route   POST /api/batches
// @desc    Create new batch
// @access  Private (Admin)
router.post('/', protect, authorize('admin'), validateBatch, createBatch);

// @route   PUT /api/batches/:id
// @desc    Update batch
// @access  Private (Admin)
router.put('/:id', protect, authorize('admin'), validateId, validateBatch, updateBatch);

// @route   DELETE /api/batches/:id
// @desc    Delete batch
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), validateId, deleteBatch);

// @route   GET /api/batches/stats
// @desc    Get batch statistics
// @access  Private (Admin)
router.get('/stats', protect, authorize('admin'), getBatchStats);

export default router;







