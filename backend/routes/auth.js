const express = require('express');
const router = express.Router();

// Temporary admin credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@pgtech.com',
    password: 'Admin@123'
};

// In-memory storage for OTPs and sessions (for demo)
const otpStore = new Map();
const sessions = new Map();

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Login endpoint - verify credentials and generate OTP
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        otpStore.set(email, { otp, expiry: otpExpiry });

        console.log(`\n🔐 OTP Generated for ${email}: ${otp}\n`);

        res.json({
            success: true,
            message: 'OTP sent successfully. Check console.',
            email,
            otp // In production, don't send OTP in response!
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// Verify OTP endpoint
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    const storedOTP = otpStore.get(email);

    if (!storedOTP) {
        return res.status(400).json({
            success: false,
            message: 'No OTP found. Please login again.'
        });
    }

    if (Date.now() > storedOTP.expiry) {
        otpStore.delete(email);
        return res.status(400).json({
            success: false,
            message: 'OTP expired. Please login again.'
        });
    }

    if (storedOTP.otp !== otp) {
        return res.status(401).json({
            success: false,
            message: 'Invalid OTP'
        });
    }

    // OTP verified, create session
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    sessions.set(sessionToken, {
        email,
        expiry: sessionExpiry
    });

    otpStore.delete(email);

    res.json({
        success: true,
        message: 'Login successful',
        token: sessionToken,
        user: { email }
    });
});

// Check session endpoint
router.get('/check', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    const session = sessions.get(token);

    if (!session) {
        return res.status(401).json({
            success: false,
            message: 'Invalid session'
        });
    }

    if (Date.now() > session.expiry) {
        sessions.delete(token);
        return res.status(401).json({
            success: false,
            message: 'Session expired'
        });
    }

    res.json({
        success: true,
        user: { email: session.email }
    });
});

// Logout endpoint
router.post('/logout', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        sessions.delete(token);
    }

    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;
