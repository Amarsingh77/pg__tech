import mongoose from 'mongoose';

// Global variable to cache the connection across invocations in Serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering for Serverless
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log('Creating new MongoDB connection...');
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







