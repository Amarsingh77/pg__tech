import express from 'express';
import {
  login,
  logout,
  verifyToken,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateLogin, handleValidationErrors } from '../middleware/validation.js';
import { body } from 'express-validator';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, login);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, logout);

// @route   GET /api/auth/verify
// @desc    Verify token
// @access  Private
router.get('/verify', protect, verifyToken);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  protect,
  body('profile.firstName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters'),
  body('profile.lastName').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Last name must be between 1 and 50 characters'),
  body('profile.phone').optional().trim().isLength({ min: 1, max: 20 }).withMessage('Phone must be between 1 and 20 characters'),
  body('profile.bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  handleValidationErrors
], updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', [
  protect,
  body('currentPassword').isLength({ min: 1 }).withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  handleValidationErrors
], changePassword);

export default router;






