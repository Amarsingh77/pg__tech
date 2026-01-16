import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import courseRoutes from './routes/courses.js';
import testimonialRoutes from './routes/testimonials.js';
import enrollmentRoutes from './routes/enrollments.js';
import batchRoutes from './routes/batches.js';
import authRoutes from './routes/auth.js';
import galleryRoutes from './routes/gallery.js';
import instructorRoutes from './routes/instructors.js';
import enquiryRoutes from './routes/enquiries.js';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Loaded PORT from env:', process.env.PORT);

// Connect to Database
// Connect to Database (with error handling)
connectDB().then(() => {
  // Seed default admin
  import('./models/User.js').then(m => m.default.createDefaultAdmin().catch(e => console.error('Seeding failed:', e)));
}).catch(err => {
  console.error("CRITICAL: Database Connection Failed on Startup", err);
  // Do not crash the process; let the API serve error responses
});

const app = express();
const PORT = process.env.PORT || 5001;

// Trust Vercel Proxy (Required for rate-limiting and IP logging)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://pgtech.in',
      'https://red-anteater-976251.hostingersite.com',
      'http://localhost:5173',
      'http://localhost:5001'
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app') || origin.endsWith('.hostingersite.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// API rate limiting (stricter for API routes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 API requests per windowMs
  message: 'Too many API requests, please try again later.'
});
app.use('/api/', apiLimiter);

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  let dbStatus = 'Disconnected';
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  } catch (err) {
    dbStatus = 'Connection Error: ' + err.message;
  }

  res.status(200).json({
    status: 'OK',
    database: dbStatus,
    mongodb_uri_set: !!process.env.MONGODB_URI,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/batches', batchRoutes);

// Temporary Seeding Endpoint (Secure it with a simple query param or just use internal logic)
app.post('/api/admin/seed-courses', async (req, res) => {
  try {
    const { fileURLToPath } = await import('url');
    const path = await import('path');
    const fs = await import('fs');
    const Course = (await import('./models/Course.js')).default;
    const connectDB = (await import('./config/database.js')).default;

    // Ensure DB is connected
    await connectDB();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Attempt multiple paths for Vercel vs Local
    let coursesDataPath = path.join(__dirname, 'data/courses.json');
    if (!fs.existsSync(coursesDataPath)) {
      coursesDataPath = path.join(process.cwd(), 'data/courses.json');
    }
    if (!fs.existsSync(coursesDataPath)) {
      coursesDataPath = path.join(process.cwd(), 'server/data/courses.json');
    }

    if (!fs.existsSync(coursesDataPath)) {
      throw new Error(`Could not find courses.json. Checked: ${path.join(__dirname, 'data/courses.json')} and ${path.join(process.cwd(), 'data/courses.json')}`);
    }

    const courses = JSON.parse(fs.readFileSync(coursesDataPath, 'utf-8'));

    await Course.deleteMany({});

    const coursesToInsert = courses.map(course => ({
      title: course.title,
      description: course.description,
      duration: course.duration,
      level: course.level || 'Beginner',
      stream: course.stream || 'Other',
      image: course.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      curriculum: course.curriculum || [],
      syllabusPdf: course.syllabusPdf || '',
      isActive: true,
      showOnHomePage: true,
      order: 0,
      iconName: course.title.toLowerCase().includes('computer') ? 'Code' :
        course.title.toLowerCase().includes('mechanical') ? 'Cog' :
          course.title.toLowerCase().includes('civil') ? 'Building' : 'Book'
    }));

    await Course.insertMany(coursesToInsert);
    res.status(200).json({ message: 'Success', count: coursesToInsert.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/enquiries', enquiryRoutes);

// 404 handler
// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Serve frontend in production (BUT NOT ON VERCEL SERVERLESS)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  // Serve static files from the dist directory
  const distPath = path.join(__dirname, 'dist');
  const parentDistPath = path.join(__dirname, '../dist');

  // Check if local dist exists, otherwise use parent
  const finalDistPath = fs.existsSync(distPath) ? distPath : parentDistPath;

  app.use(express.static(finalDistPath));

  // Handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(finalDistPath, 'index.html'));
  });
} else {
  // Default route for Vercel or DB checks
  app.get('/', (req, res) => {
    res.send('API is running... (Backend Only Mode)');
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
// Only listen if not running in Vercel (Vercel exports the app instead)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`🚀 TechInstitute Backend Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}

export default app;







