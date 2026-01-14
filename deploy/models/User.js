import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['admin', 'instructor', 'student'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    phone: String,
    mobile: String,
    bio: String
  },
  permissions: [{
    type: String,
    enum: ['manage_courses', 'manage_enrollments', 'manage_testimonials', 'manage_batches', 'view_analytics']
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  otp: String,
  otpExpire: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for authentication
// userSchema.index({ email: 1 }, { unique: true }); // Removed duplicate
// userSchema.index({ username: 1 }, { unique: true }); // Removed duplicate

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  if (this.profile && this.profile.firstName && this.profile.lastName) {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  }
  return this.username;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

// Static method to create default admin user
userSchema.statics.createDefaultAdmin = async function () {
  try {
    const adminExists = await this.findOne({ role: 'admin' });
    if (adminExists) return adminExists;

    const defaultAdmin = await this.create({
      username: 'admin',
      email: 'admin@techinstitute.com',
      password: 'admin123', // Will be hashed by pre-save middleware
      role: 'admin',
      permissions: ['manage_courses', 'manage_enrollments', 'manage_testimonials', 'manage_batches', 'view_analytics'],
      profile: {
        firstName: 'System',
        lastName: 'Administrator'
      }
    });

    console.log('✅ Default admin user created');
    return defaultAdmin;
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

const User = mongoose.model('User', userSchema);

export default User;







