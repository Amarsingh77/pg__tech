import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true,
    maxlength: [500, 'Quote cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5
  },
  image: {
    type: String,
    default: 'https://placehold.co/100x100/E2E8F0/4A5568?text=U'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
testimonialSchema.index({ isActive: 1, order: 1 });

// Static method to get active testimonials
testimonialSchema.statics.getActiveTestimonials = function () {
  return this.find({ isActive: true }).sort({ order: 1 });
};

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;







