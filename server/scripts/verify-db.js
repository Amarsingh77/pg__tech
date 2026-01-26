import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '/Users/amarpreetsingh/Desktop/pg__tech/server/.env', override: true });

const testConnection = async () => {
    try {
        console.log('Uri:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await mongoose.connection.db.collection('courses').countDocuments();
        console.log(`Total courses: ${count}`);

        const homePageCount = await mongoose.connection.db.collection('courses').countDocuments({ showOnHomePage: true });
        console.log(`Courses with showOnHomePage:true: ${homePageCount}`);

        const activeCount = await mongoose.connection.db.collection('courses').countDocuments({ isActive: true });
        console.log(`Courses with isActive:true: ${activeCount}`);

        const sample = await mongoose.connection.db.collection('courses').findOne();
        console.log('Sample course:', JSON.stringify(sample, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error('Connection failed:', err);
    }
};

testConnection();
