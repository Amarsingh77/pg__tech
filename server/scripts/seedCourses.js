import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Course from '../models/Course.js';
import connectDB from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedCourses = async () => {
    try {
        await connectDB();
        console.log('Connected to database for seeding...');

        // Read course data
        const coursesDataPath = path.join(__dirname, '../data/courses.json');
        const courses = JSON.parse(fs.readFileSync(coursesDataPath, 'utf-8'));

        console.log(`Found ${courses.length} courses in JSON. Starting import...`);

        // Clear existing courses (Optional - usually safer to update or only add if empty)
        // For now, we will add only missing ones to avoid duplicates if ID is same
        // But since we want "all the courses", we'll just clear and re-add for a clean slate
        await Course.deleteMany({});
        console.log('Cleared existing courses.');

        const coursesToInsert = courses.map(course => {
            // Map JSON fields to Mongoose Model fields
            return {
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
                // Default icon mapping if not present
                iconName: course.title.toLowerCase().includes('computer') ? 'Code' :
                    course.title.toLowerCase().includes('mechanical') ? 'Cog' :
                        course.title.toLowerCase().includes('civil') ? 'Building' : 'Book'
            };
        });

        await Course.insertMany(coursesToInsert);
        console.log('✅ Successfully seeded ' + coursesToInsert.length + ' courses!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        process.exit(1);
    }
};

seedCourses();
