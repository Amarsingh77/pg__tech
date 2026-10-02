import mongoose from 'mongoose';
import Batch from '../models/Batch.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const testBatchCreation = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI missing');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Test 1: Try to create with 'Open' (Expected to FAIL)
        console.log('\nTest 1: Creating batch with status "Open" (Should FAIL)');
        try {
            await Batch.create({
                course: 'Test Course',
                startDate: '2025-01-01',
                time: '10:00 AM',
                days: 'Mon-Fri',
                status: 'Open' // Invalid
            });
            console.log('❌ UNEXPECTED: Created batch with status "Open"');
        } catch (err) {
            console.log('✅ EXPECTED: Failed to create batch with "Open". Error:', err.message);
        }

        // Test 2: Try to create with 'Upcoming' (Expected to SUCCEED)
        console.log('\nTest 2: Creating batch with status "Upcoming" (Should SUCCEED)');
        try {
            const batch = await Batch.create({
                course: 'Test Course Valid',
                startDate: '2025-01-01',
                time: '10:00 AM',
                days: 'Mon-Fri',
                status: 'Upcoming' // Valid
            });
            console.log('✅ EXPECTED: Created batch with status "Upcoming"');

            // Cleanup
            await Batch.findByIdAndDelete(batch._id);
            console.log('Cleanup: Deleted test batch');
        } catch (err) {
            console.log('❌ UNEXPECTED: Failed to create batch with "Upcoming". Error:', err.message);
        }

    } catch (error) {
        console.error('Script Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

testBatchCreation();
