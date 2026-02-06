import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('\n--- PG Tech Environment & Connectivity Diagnostic ---\n');

// 1. Check Environment Variables
const checkVar = (name) => {
    const value = process.env[name];
    if (!value) {
        console.log(`❌ ${name}: NOT FOUND`);
        return false;
    }

    // Mask sensitive info
    let displayValue = value;
    if (name.includes('URI') || name.includes('SECRET') || name.includes('PASSWORD') || name.includes('PASS')) {
        if (value.includes('://')) {
            displayValue = value.replace(/:([^:@]+)@/, ':****@');
        } else {
            displayValue = '****' + value.slice(-4);
        }
    }

    console.log(`✅ ${name}: ${displayValue}`);
    return true;
};

const importantVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];
let envOk = true;

console.log('--- Environment Variables ---');
importantVars.forEach(v => {
    if (!checkVar(v)) envOk = false;
});

if (!envOk) {
    console.error('\n⚠️  Critical environment variables are missing! Database connection may fail.');
} else {
    console.log('\n👍 Environment variables look present.');
}

// 2. Test Database Connection
console.log('\n--- Database Connectivity ---');
const testDb = async () => {
    if (!process.env.MONGODB_URI) {
        console.log('❌ MONGODB_URI missing, skipping DB test.');
        process.exit(1);
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connected to MongoDB successfully!');

        const adminDb = mongoose.connection.db.admin();
        const pingResult = await adminDb.ping();
        console.log('✅ Database Ping Result:', pingResult);

        console.log('✅ Database Name:', mongoose.connection.name);
        console.log('✅ Host:', mongoose.connection.host);

    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('   Error Name:', error.name);
        console.error('   Error Message:', error.message);
        if (error.cause) console.error('   Cause:', error.cause);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n--- End of Diagnostic ---\n');
        process.exit(0);
    }
};

testDb();
