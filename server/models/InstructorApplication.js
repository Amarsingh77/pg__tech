import mongoose from 'mongoose';

const instructorApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    linkedin: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        required: [true, 'Years of experience is required'],
        trim: true
    },
    qualifications: {
        type: String,
        required: [true, 'Qualifications are required'],
        trim: true,
        maxlength: [1000, 'Qualifications cannot exceed 1000 characters']
    },
    resume: {
        type: String,
        required: [true, 'Resume is required']
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'contacted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const InstructorApplication = mongoose.model('InstructorApplication', instructorApplicationSchema);

export default InstructorApplication;
