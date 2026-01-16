import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  iconName: {
    type: String,
    required: [true, 'Icon name is required'],
    enum: ['Code', 'Brain', 'Cloud', 'Shield', 'Database', 'Book', 'HardHat', 'Settings', 'Cpu', 'Cog', 'Building'],
    default: 'Code'
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced'],
    default: 'Beginner'
  },
  color: {
    type: String,
    required: [true, 'Color gradient is required'],
    default: 'from-blue-500 to-indigo-600'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  price: {
    type: Number,
    default: 0
  },
  discountedPrice: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  showOnHomePage: {
    type: Boolean,
    default: true
  },
  stream: {
    type: String,
    enum: ['CSE', 'ME', 'CE', 'EE', 'ECE', 'Other'],
    default: 'Other'
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
  },
  curriculum: [{
    type: String
  }],
  syllabusPdf: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
courseSchema.index({ isActive: 1, order: 1 });

// Virtual for enrollment count
courseSchema.virtual('enrollmentCount', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'courseId',
  count: true
});

// Static method to get active courses
courseSchema.statics.getActiveCourses = function () {
  return this.find({ isActive: true }).sort({ order: 1 });
};

const Course = mongoose.model('Course', courseSchema);

export default Course;







