import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({}).select('email username role isActive');
        console.log('Users found:', users.length);
        console.log(JSON.stringify(users, null, 2));

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error listing users:', error);
    }
};

listUsers();
