import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// Import Model (Assuming we are in server/scripts)
import Course from '../models/Course.js';

const syncImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techinstitute');
        console.log('MongoDB Connected');

        const coursesJson = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'courses.json'), 'utf-8'));

        for (const c of coursesJson) {
            // Find by title (more reliable since custom IDs in JSON might not be in DB)
            const result = await Course.updateMany(
                { title: c.title },
                { $set: { image: c.image } }
            );
            console.log(`Updated ${result.modifiedCount} courses with title: ${c.title}`);
        }

        console.log('✅ Image Sync Completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

syncImages();
