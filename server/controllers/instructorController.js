import InstructorApplication from '../models/InstructorApplication.js';

// @desc    Submit instructor application
// @route   POST /api/instructors/apply
// @access  Public
export const applyInstructor = async (req, res) => {
    try {
        const applicationData = { ...req.body };

        if (req.file) {
            applicationData.resume = `/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Resume file is required'
            });
        }

        const application = await InstructorApplication.create(applicationData);

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        console.error('Instructor application error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error submitting application'
        });
    }
};

// @desc    Get all instructor applications
// @route   GET /api/instructors
// @access  Private (Admin only)
export const getApplications = async (req, res) => {
    try {
        const applications = await InstructorApplication.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error getting applications'
        });
    }
};
