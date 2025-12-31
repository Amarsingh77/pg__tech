import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social', 'other'],
    default: 'website'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
enrollmentSchema.index({ email: 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ enrollmentDate: -1 });
enrollmentSchema.index({ courseId: 1 });

// Virtual for formatted date
enrollmentSchema.virtual('formattedDate').get(function() {
  return this.enrollmentDate.toLocaleDateString();
});

// Pre-save middleware to set courseId if courseName matches
enrollmentSchema.pre('save', async function(next) {
  if (this.courseName && !this.courseId) {
    try {
      const Course = mongoose.model('Course');
      const course = await Course.findOne({ title: this.courseName });
      if (course) {
        this.courseId = course._id;
      }
    } catch (error) {
      console.error('Error finding course for enrollment:', error);
    }
  }
  next();
});

// Static method to get enrollments by status
enrollmentSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ enrollmentDate: -1 });
};

// Static method to get recent enrollments
enrollmentSchema.statics.getRecent = function(limit = 10) {
  return this.find().sort({ enrollmentDate: -1 }).limit(limit);
};

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;







