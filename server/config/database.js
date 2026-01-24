import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the root of the server directory
dotenv.config({ path: path.join(__dirname, '../.env'), override: true });
// Global variable to cache the connection across invocations in Serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    // console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ CRITICAL: MONGODB_URI is not defined in environment variables');
    throw new Error('MONGODB_URI is not defined in environment variables. Please check your .env file or Vercel settings.');
  }

  // Mask sensitive information in URI for logging
  const maskedUri = process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@');

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering for Serverless
    };

    console.log(`Creating new MongoDB connection to: ${maskedUri}`);
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('🗄️  MongoDB Connected: ' + mongoose.connection.host);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB Connection Error:', e);
    throw e;
  }
};

export default connectDB;







