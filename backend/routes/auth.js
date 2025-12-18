const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Helper to read/write users
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
};

const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// In-memory storage for OTPs and sessions
const otpStore = new Map();
const sessions = new Map();

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Login endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
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
        return res.status(400).json({ success: false, message: 'No OTP found. Please login again.' });
    }

    if (Date.now() > storedOTP.expiry) {
        otpStore.delete(email);
        return res.status(400).json({ success: false, message: 'OTP expired. Please login again.' });
    }

    if (storedOTP.otp !== otp) {
        return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP verified, create session
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    sessions.set(sessionToken, { email, expiry: sessionExpiry });
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
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const session = sessions.get(token);
    if (!session) return res.status(401).json({ success: false, message: 'Invalid session' });

    if (Date.now() > session.expiry) {
        sessions.delete(token);
        return res.status(401).json({ success: false, message: 'Session expired' });
    }

    res.json({ success: true, user: { email: session.email } });
});

// Logout endpoint
router.post('/logout', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) sessions.delete(token);
    res.json({ success: true, message: 'Logged out successfully' });
});

// --- New Management Endpoints ---

// Get all admins
router.get('/admins', (req, res) => {
    const users = readUsers();
    // Return only necessary info
    const safeUsers = users.map(u => ({ id: u.id, email: u.email, role: u.role }));
    res.json(safeUsers);
});

// Add new admin
router.post('/add-admin', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    if (users.length >= 10) {
        return res.status(400).json({ success: false, message: 'Maximum limit of 10 admins reached.' });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'Admin with this email already exists.' });
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password, // In production, hash this!
        role: 'admin'
    };

    users.push(newUser);
    writeUsers(users);

    res.json({ success: true, message: 'Admin added successfully', user: { id: newUser.id, email: newUser.email } });
});

// Change Password (and Email)
router.post('/change-password', (req, res) => {
    const { currentEmail, newEmail, currentPassword, newPassword } = req.body;
    const users = readUsers();

    const userIndex = users.findIndex(u => u.email === currentEmail && u.password === currentPassword);

    if (userIndex === -1) {
        return res.status(401).json({ success: false, message: 'Invalid current credentials' });
    }

    // Update user
    users[userIndex].email = newEmail || users[userIndex].email;
    users[userIndex].password = newPassword || users[userIndex].password;

    writeUsers(users);

    res.json({ success: true, message: 'Credentials updated successfully' });
});

// Forgot Password
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        // Mock sending email
        console.log(`\n📧 [MOCK EMAIL] Password Recovery for ${email}`);
        console.log(`Your password is: ${user.password}`);
        console.log(`(In a real app, this would be a reset link sent to email)\n`);

        res.json({ success: true, message: 'If the email exists, credentials have been sent to it.' });
    } else {
        // Don't reveal if user exists
        res.json({ success: true, message: 'If the email exists, credentials have been sent to it.' });
    }
});

module.exports = router;
