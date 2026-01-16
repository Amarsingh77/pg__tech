import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
    try {
        const images = await Gallery.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: images.length, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add new image
// @route   POST /api/gallery
// @access  Private/Admin
export const addGalleryImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const { title, category } = req.body;
        const file = req.file;
        const base64 = file.buffer.toString('base64');
        const image = `data:${file.mimetype};base64,${base64}`;

        const galleryImage = await Gallery.create({
            title,
            category,
            image
        });

        res.status(201).json({ success: true, data: galleryImage });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Delete file from filesystem
        if (image.image) {
            const fileName = image.image.split('/uploads/')[1];
            if (fileName) {
                const filePath = path.join('uploads', fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        await image.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
