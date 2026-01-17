import { body, param, query, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Course validation rules
export const validateCourse = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('iconName')
    .optional()
    .isIn(['Code', 'Brain', 'Cloud', 'Shield', 'Database', 'Book'])
    .withMessage('Invalid icon name'),
  body('duration')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Duration must be between 1 and 50 characters'),
  body('level')
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Level must be Beginner, Intermediate, or Advanced'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Description must be between 1 and 300 characters'),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  body('discountedPrice')
    .optional()
    .isNumeric()
    .withMessage('Discounted price must be a number'),
  body('order')
    .optional()
    .isInt()
    .withMessage('Order must be an integer'),
  handleValidationErrors
];

// Testimonial validation rules
export const validateTestimonial = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),
  body('role')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Role must be between 1 and 100 characters'),
  body('quote')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Quote must be between 1 and 500 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('image')
    .optional()
    // If it's a file upload, this might be tricky, but assuming URL string for now based on JSON data
    // Remove isURL strictly if we expect relative paths or non-standard URLs, 
    // but keep it for now as data has http/https.
    // Actually, let's allow it to be optional string to be safe against different formats.
    .isString()
    .withMessage('Image must be a valid string'),
  handleValidationErrors
];

// Enrollment validation rules
export const validateEnrollment = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Phone must be between 1 and 20 characters'),
  body('courseName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Course name must be between 1 and 100 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  handleValidationErrors
];

// Batch validation rules
export const validateBatch = [
  body('course')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Course must be between 1 and 100 characters'),
  body('startDate')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Start date is required'),
  body('endDate')
    .optional(),
  body('mode')
    .isIn(['Online (Live)', 'Offline (Weekday)', 'Offline (Weekend)', 'Hybrid (Online + Offline)', 'On-Campus', 'Evening School', 'Hybrid', 'Online', 'Offline'])
    .withMessage('Invalid mode'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be at least 1'),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  body('instructor')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Instructor name cannot exceed 100 characters'),
  handleValidationErrors
];

// ID parameter validation
export const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors
];

// Query parameter validation for pagination
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .matches(/^[-]?[a-zA-Z_]+$/)
    .withMessage('Invalid sort parameter'),
  handleValidationErrors
];

// User login validation
export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email or username is required'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
  handleValidationErrors
];







