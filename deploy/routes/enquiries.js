import express from 'express';
import Enquiry from '../models/Enquiry.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { type, name, email, phone, data } = req.body;

        const enquiry = await Enquiry.create({
            type,
            name,
            email,
            phone,
            data
        });

        res.status(201).json({
            success: true,
            data: enquiry
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id
// @access  Private/Admin
router.patch('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const { status } = req.body;

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: enquiry
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

export default router;
