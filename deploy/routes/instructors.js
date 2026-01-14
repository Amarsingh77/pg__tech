import express from 'express';
import { applyInstructor, getApplications } from '../controllers/instructorController.js';
import upload from '../middleware/upload.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/instructors/apply
// @desc    Submit instructor application
// @access  Public
router.post('/apply', upload.single('resume'), applyInstructor);

// @route   GET /api/instructors
// @desc    Get all instructor applications
// @access  Private (Admin)
router.get('/', protect, authorize('admin'), getApplications);

export default router;
