import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['contact', 'project', 'demo', 'consultation'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['new', 'read', 'contacted', 'archived'],
        default: 'new'
    },
    // Flexible data field for type-specific details
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Enquiry', enquirySchema);
