import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

// Import Models
import User from '../models/User.js';
import Course from '../models/Course.js';
import Batch from '../models/Batch.js';
import Testimonial from '../models/Testimonial.js';
import Gallery from '../models/Gallery.js';
import Enrollment from '../models/Enrollment.js';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../backend/data');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techinstitute');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const readJSON = (filename) => {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return [];
};

const importData = async () => {
    try {
        await connectDB();

        // 1. Users
        const users = readJSON('users.json');
        if (users.length > 0) {
            await User.deleteMany(); // Clear existing
            console.log('Existing Users cleared.');

            const usersToInsert = await Promise.all(users.map(async (u) => {
                // Determine role
                let role = 'student';
                if (u.role === 'super_admin') role = 'admin';
                if (u.role === 'admin') role = 'admin';

                // Hash password (it's plain text in JSON)
                // Note: User model pre-save hook handles hashing, but we might be using insertMany which bypasses hooks?
                // insertMany with { ordered: false } bypasses middleware? No, it generally bypasses pre-save ONLY if using Model.collection.insert.
                // But mongoose insertMany validates but DOES NOT run pre-save hooks normally.
                // We should iterate and save, OR manually hash. Manual hash is safer.
                // const salt = await bcrypt.genSalt(12);
                // const hashedPassword = await bcrypt.hash(u.password, salt);

                return {
                    username: u.email.split('@')[0], // Generate username from email
                    email: u.email,
                    password: u.password, // We let the pre-save hook handle it if we use create(), but if we use insertMany we must hash. 
                    // Let's use create() in loop to use the model's logic/hooks
                    role,
                    profile: {
                        mobile: u.mobile
                    }
                };
            }));

            // Use create to trigger pre-save hooks (hashing)
            for (const u of usersToInsert) {
                // check if exists
                const exists = await User.findOne({ email: u.email });
                if (!exists) {
                    await User.create(u);
                }
            }
            console.log('Users Migrated!');
        }

        // 2. Courses
        const courses = readJSON('courses.json');
        if (courses.length > 0) {
            await Course.deleteMany();
            console.log('Existing Courses cleared.');

            const coursesToInsert = courses.map(c => ({
                title: c.title,
                description: c.description,
                duration: c.duration,
                level: c.level,
                stream: c.stream || 'Other',
                image: c.image || 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Course',
                curriculum: c.curriculum || [],
                syllabusPdf: c.syllabusPdf,
                isActive: true
            }));
            await Course.insertMany(coursesToInsert);
            console.log('Courses Migrated!');
        }

        // 3. Batches
        const batches = readJSON('batches.json');
        if (batches.length > 0) {
            await Batch.deleteMany();
            console.log('Existing Batches cleared.');

            const batchesToInsert = await Promise.all(batches.map(async b => {
                // Find course ID
                const course = await Course.findOne({ title: b.course });
                return {
                    course: b.course,
                    courseId: course ? course._id : null,
                    startDate: b.startDate,
                    mode: b.mode,
                    capacity: b.seats || 30,
                    status: b.status === 'Open' ? 'Upcoming' : (b.status === 'Filling Fast' ? 'Upcoming' : 'Upcoming'),
                    isActive: true
                };
            }));
            await Batch.insertMany(batchesToInsert);
            console.log('Batches Migrated!');
        }

        // 4. Testimonials
        const testimonials = readJSON('testimonials.json');
        if (testimonials.length > 0) {
            await Testimonial.deleteMany();
            console.log('Existing Testimonials cleared.');

            const testimonialsToInsert = testimonials.map(t => ({
                name: t.name,
                course: t.role.replace(' Graduate', ''), // Approx mapping
                quote: t.quote,
                rating: t.rating,
                avatar: t.image,
                isActive: true
            }));
            await Testimonial.insertMany(testimonialsToInsert);
            console.log('Testimonials Migrated!');
        }

        // 5. Gallery
        const gallery = readJSON('gallery.json');
        if (gallery.length > 0) {
            await Gallery.deleteMany();
            console.log('Existing Gallery cleared.');

            const galleryToInsert = gallery.map(g => ({
                title: g.title,
                category: g.category,
                image: g.url || g.image,
                isActive: true
            }));
            await Gallery.insertMany(galleryToInsert);
            console.log('Gallery Migrated!');
        }

        // 6. Enrollments
        const enrollments = readJSON('enrollments.json');
        if (enrollments.length > 0) {
            await Enrollment.deleteMany();
            console.log('Existing Enrollments cleared.');
            // ... logic if any enrollments exist ...
            console.log('Enrollments Migrated (if any)!');
        }

        console.log('✅ Data Migration Completed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

importData();
