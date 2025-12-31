import Batch from '../models/Batch.js';

// @desc    Get all batches
// @route   GET /api/batches
// @access  Public
export const getBatches = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'startDate', active = 'true', status } = req.query;

    // Build query
    const query = {};
    if (active === 'true') {
      query.isActive = true;
    }
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortObj = {};
    const sortField = sort.replace('-', '');
    const sortOrder = sort.startsWith('-') ? -1 : 1;
    sortObj[sortField] = sortOrder;

    // Execute query
    const batches = await Batch.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('courseId', 'title iconName');

    // Get total count for pagination
    const total = await Batch.countDocuments(query);

    res.status(200).json({
      success: true,
      count: batches.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      },
      data: batches
    });
  } catch (error) {
    console.error('Get batches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting batches'
    });
  }
};

// @desc    Get single batch
// @route   GET /api/batches/:id
// @access  Public
export const getBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id)
      .populate('courseId', 'title iconName description');

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    res.status(200).json({
      success: true,
      data: batch
    });
  } catch (error) {
    console.error('Get batch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting batch'
    });
  }
};

// @desc    Create new batch
// @route   POST /api/batches
// @access  Private (Admin only)
export const createBatch = async (req, res) => {
  try {
    const batch = await Batch.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Batch created successfully',
      data: batch
    });
  } catch (error) {
    console.error('Create batch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating batch'
    });
  }
};

// @desc    Update batch
// @route   PUT /api/batches/:id
// @access  Private (Admin only)
export const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('courseId', 'title iconName');

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Batch updated successfully',
      data: batch
    });
  } catch (error) {
    console.error('Update batch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating batch'
    });
  }
};

// @desc    Delete batch
// @route   DELETE /api/batches/:id
// @access  Private (Admin only)
export const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    // Soft delete by setting isActive to false
    batch.isActive = false;
    await batch.save();

    res.status(200).json({
      success: true,
      message: 'Batch deleted successfully'
    });
  } catch (error) {
    console.error('Delete batch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting batch'
    });
  }
};

// @desc    Get upcoming batches
// @route   GET /api/batches/upcoming
// @access  Public
export const getUpcomingBatches = async (req, res) => {
  try {
    const batches = await Batch.getUpcoming().populate('courseId', 'title iconName');

    res.status(200).json({
      success: true,
      count: batches.length,
      data: batches
    });
  } catch (error) {
    console.error('Get upcoming batches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting upcoming batches'
    });
  }
};

// @desc    Get batch statistics
// @route   GET /api/batches/stats
// @access  Private (Admin only)
export const getBatchStats = async (req, res) => {
  try {
    const stats = await Batch.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalCapacity: { $sum: '$capacity' },
          totalEnrolled: { $sum: '$enrolledCount' }
        }
      }
    ]);

    // Get batches by mode
    const modeStats = await Batch.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$mode',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        modeStats
      }
    });
  } catch (error) {
    console.error('Get batch stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting batch statistics'
    });
  }
};







