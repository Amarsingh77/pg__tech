import dotenv from 'dotenv';
import path from 'path';

const res = dotenv.config({ path: '/Users/amarpreetsingh/Desktop/pg__tech/server/.env' });
console.log('Dotenv result:', res);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length);
