import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from '../models/Testimonial.js';
import connectDB from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedTestimonials = async () => {
    try {
        await connectDB();

        console.log('Connected to database...');

        // Clear existing
        await Testimonial.deleteMany({});
        console.log('Testimonials cleared');

        // Read data
        // Adjust path to point to backend/data/testimonials.json from server/scripts/
        const dataPath = path.join(__dirname, '../data/testimonials.json');

        if (!fs.existsSync(dataPath)) {
            throw new Error(`Data file not found at ${dataPath}`);
        }

        const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Remove 'id' field to let Mongo generate _id, or mapped if needed tasks
        const testimonialsToInsert = jsonData.map(({ id, ...rest }) => rest);

        await Testimonial.insertMany(testimonialsToInsert);
        console.log(`Seeded ${testimonialsToInsert.length} testimonials successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding testimonials:', error);
        process.exit(1);
    }
};

seedTestimonials();
