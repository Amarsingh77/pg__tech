import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  course: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null
  },
  startDate: {
    type: String, // Using string format for frontend compatibility (e.g., "2025-12-01")
    required: [true, 'Start date is required']
  },
  endDate: {
    type: String,
    default: null
  },
  mode: {
    type: String,
    required: [true, 'Mode is required'],
    enum: ['Online (Live)', 'Offline (Weekday)', 'Offline (Weekend)', 'Hybrid (Online + Offline)', 'On-Campus', 'Evening School', 'Hybrid'],
    default: 'Online (Live)'
  },
  capacity: {
    type: Number,
    default: 30,
    min: [1, 'Capacity must be at least 1']
  },
  enrolledCount: {
    type: Number,
    default: 0,
    min: [0, 'Enrolled count cannot be negative']
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  instructor: {
    type: String,
    trim: true,
    maxlength: [100, 'Instructor name cannot exceed 100 characters']
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
batchSchema.index({ startDate: 1 });
batchSchema.index({ status: 1 });
batchSchema.index({ isActive: 1 });

// Virtual for available seats
batchSchema.virtual('availableSeats').get(function () {
  return Math.max(0, this.capacity - this.enrolledCount);
});

// Virtual for isFull
batchSchema.virtual('isFull').get(function () {
  return this.enrolledCount >= this.capacity;
});

// Pre-save middleware to set courseId if course name matches
batchSchema.pre('save', async function (next) {
  if (this.course && !this.courseId) {
    try {
      const Course = mongoose.model('Course');
      const course = await Course.findOne({ title: this.course });
      if (course) {
        this.courseId = course._id;
      }
    } catch (error) {
      console.error('Error finding course for batch:', error);
    }
  }
  next();
});

// Static method to get upcoming batches
batchSchema.statics.getUpcoming = function () {
  const today = new Date().toISOString().split('T')[0];
  return this.find({
    startDate: { $gte: today },
    status: 'Upcoming',
    isActive: true
  }).sort({ startDate: 1 });
};

// Static method to get active batches
batchSchema.statics.getActive = function () {
  return this.find({
    status: { $in: ['Upcoming', 'Ongoing'] },
    isActive: true
  }).sort({ startDate: 1 });
};

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;







