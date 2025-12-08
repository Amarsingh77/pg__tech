import Testimonial from '../models/Testimonial.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
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
    const testimonials = await Testimonial.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Testimonial.countDocuments(query);

    res.status(200).json({
      success: true,
      count: testimonials.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      },
      data: testimonials
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting testimonials'
    });
  }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
export const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting testimonial'
    });
  }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin only)
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating testimonial'
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin only)
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating testimonial'
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin only)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Soft delete by setting isActive to false
    testimonial.isActive = false;
    await testimonial.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting testimonial'
    });
  }
};

// @desc    Get testimonial statistics
// @route   GET /api/testimonials/stats
// @access  Private (Admin only)
export const getTestimonialStats = async (req, res) => {
  try {
    const stats = await Testimonial.aggregate([
      {
        $group: {
          _id: null,
          totalTestimonials: { $sum: 1 },
          activeTestimonials: {
            $sum: { $cond: ['$isActive', 1, 0] }
          },
          inactiveTestimonials: {
            $sum: { $cond: ['$isActive', 0, 1] }
          },
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    // Get rating distribution
    const ratingDistribution = await Testimonial.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        ...(stats[0] || {
          totalTestimonials: 0,
          activeTestimonials: 0,
          inactiveTestimonials: 0,
          averageRating: 0
        }),
        ratingDistribution
      }
    });
  } catch (error) {
    console.error('Get testimonial stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting testimonial statistics'
    });
  }
};






