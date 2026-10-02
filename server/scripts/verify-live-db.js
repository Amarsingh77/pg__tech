import mongoose from 'mongoose';

const uri = "mongodb+srv://sahilsinghinsa3_db_user:PgTech2026@pgtech.diovmjb.mongodb.net/techinstitute?appName=PgTech";

console.log('Attempting to connect to MongoDB...');

try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ SUCCESS: Connected to MongoDB!');
    console.log('Database Name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);

    // List collections to prove deep access
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name).join(', '));

    await mongoose.disconnect();
    console.log('Disconnected.');
} catch (error) {
    console.error('❌ FAILED to connect:');
    console.error(error.message);
}
