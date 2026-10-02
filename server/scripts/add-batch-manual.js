import mongoose from 'mongoose';
import Batch from '../models/Batch.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const createManualBatch = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI missing');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const newBatch = {
            course: 'Full Stack Web Development',
            stream: 'CSE',
            startDate: '2025-03-01',
            time: '10:00 AM',
            days: 'Mon, Wed, Fri',
            mode: 'Online (Live)',
            status: 'Upcoming',
            instructor: 'Expert Instructor',
            seatsLeft: 20
        };

        console.log('Creating batch:', newBatch);
        const batch = await Batch.create(newBatch);
        console.log('✅ Batch created successfully!');
        console.log('Batch ID:', batch._id);

    } catch (error) {
        console.error('Server Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

createManualBatch();
