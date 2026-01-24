
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the server directory (one level up from scripts)
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'Undefined');

const connect = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connection Successful!');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

connect();
