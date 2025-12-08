import Course from '../models/Course.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'order', active = 'true' } = req.query;

    // Build query
    const query = {};
    if (active === 'true') {
      query.isActive = true;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortObj = {};
    const sortField = sort.replace('-', '');
    const sortOrder = sort.startsWith('-') ? -1 : 1;
    sortObj[sortField] = sortOrder;

    // Execute query
    const courses = await Course.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      },
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting courses'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting course'
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin only)
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating course'
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin only)
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating course'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Soft delete by setting isActive to false
    course.isActive = false;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting course'
    });
  }
};

// @desc    Get course statistics
// @route   GET /api/courses/stats
// @access  Private (Admin only)
export const getCourseStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          activeCourses: {
            $sum: { $cond: ['$isActive', 1, 0] }
          },
          inactiveCourses: {
            $sum: { $cond: ['$isActive', 0, 1] }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalCourses: 0,
        activeCourses: 0,
        inactiveCourses: 0
      }
    });
  } catch (error) {
    console.error('Get course stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting course statistics'
    });
  }
};






