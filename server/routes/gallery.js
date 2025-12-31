import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
router.get('/', async (req, res) => {
    try {
        const images = await Gallery.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: images.length, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @desc    Add new image
// @route   POST /api/gallery
// @access  Private/Admin
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const image = await Gallery.create(req.body);
        res.status(201).json({ success: true, data: image });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        await image.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
