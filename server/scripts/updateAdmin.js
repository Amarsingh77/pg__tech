import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const updateAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        const adminEmail = 'sahilsinghinsa3@gmail.com';
        const adminPassword = '5569Amar@';

        // Check if admin with this email already exists
        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log(`👤 Admin user found: ${admin.email}`);
            // Update password (pre-save hook will hash it)
            admin.password = adminPassword;
            admin.role = 'admin'; // Ensure role is admin
            // Ensure permissions
            admin.permissions = ['manage_courses', 'manage_enrollments', 'manage_testimonials', 'manage_batches', 'view_analytics'];

            await admin.save();
            console.log('✅ Admin credentials updated successfully');
        } else {
            console.log('👤 Creating new admin user...');
            // Check if there's an existing 'admin' user we should replace or if we're just adding a new one
            // For now, let's just create the new requested admin

            admin = await User.create({
                username: 'admin_sahil',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                permissions: ['manage_courses', 'manage_enrollments', 'manage_testimonials', 'manage_batches', 'view_analytics'],
                profile: {
                    firstName: 'Sahil',
                    lastName: 'Singh'
                }
            });
            console.log('✅ New admin user created successfully');
        }

        // Optional: List all admins to verify
        const allAdmins = await User.find({ role: 'admin' }).select('email username role');
        console.log('\nCurrent Admins:');
        allAdmins.forEach(a => console.log(`- ${a.username} (${a.email})`));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating admin:', error);
        process.exit(1);
    }
};

updateAdmin();
