import Enrollment from '../models/Enrollment.js';

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private (Admin only)
export const getEnrollments = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-enrollmentDate', status, courseName } = req.query;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }
    if (courseName) {
      query.courseName = { $regex: courseName, $options: 'i' };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortObj = {};
    const sortField = sort.replace('-', '');
    const sortOrder = sort.startsWith('-') ? -1 : 1;
    sortObj[sortField] = sortOrder;

    // Execute query
    const enrollments = await Enrollment.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('courseId', 'title');

    // Get total count for pagination
    const total = await Enrollment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: enrollments.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      },
      data: enrollments
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting enrollments'
    });
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
// @access  Private (Admin only)
export const getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('courseId', 'title');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    console.error('Get enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting enrollment'
    });
  }
};

// @desc    Create new enrollment (public endpoint for website)
// @route   POST /api/enrollments
// @access  Public
export const createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Enrollment submitted successfully. Our team will contact you soon!',
      data: {
        id: enrollment._id,
        name: enrollment.name,
        email: enrollment.email,
        courseName: enrollment.courseName,
        status: enrollment.status,
        enrollmentDate: enrollment.enrollmentDate
      }
    });
  } catch (error) {
    console.error('Create enrollment error:', {
      message: error.message,
      stack: error.stack,
      body: req.body
    });

    // Check for Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error submitting enrollment',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update enrollment
// @route   PUT /api/enrollments/:id
// @access  Private (Admin only)
export const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('courseId', 'title');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment updated successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating enrollment'
    });
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private (Admin only)
export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment deleted successfully'
    });
  } catch (error) {
    console.error('Delete enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting enrollment'
    });
  }
};

// @desc    Approve enrollment
// @route   PATCH /api/enrollments/:id/approve
// @access  Private (Admin only)
export const approveEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved' },
      { new: true }
    ).populate('courseId', 'title');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment approved successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Approve enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error approving enrollment'
    });
  }
};

// @desc    Get enrollment statistics
// @route   GET /api/enrollments/stats
// @access  Private (Admin only)
export const getEnrollmentStats = async (req, res) => {
  try {
    const stats = await Enrollment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get monthly enrollments for the last 12 months
    const monthlyStats = await Enrollment.aggregate([
      {
        $match: {
          enrollmentDate: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Last 12 months
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$enrollmentDate' },
            month: { $month: '$enrollmentDate' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Get top courses by enrollment
    const topCourses = await Enrollment.aggregate([
      {
        $group: {
          _id: '$courseName',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        monthlyStats,
        topCourses
      }
    });
  } catch (error) {
    console.error('Get enrollment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting enrollment statistics'
    });
  }
};







