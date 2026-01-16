import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
// Ensure uploads directory exists
// Robust check for Vercel/Serverless: Always try /tmp if normal creation fails
let uploadDir;
try {
    uploadDir = process.env.VERCEL ? '/tmp' : 'uploads/';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (err) {
    console.warn('Could not create upload dir, falling back to /tmp:', err);
    uploadDir = '/tmp';
}

// Configure storage to memory for serverless (Base64 conversion)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('only images and PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

export default upload;
