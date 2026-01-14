import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        default: 'General'
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
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
    timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
