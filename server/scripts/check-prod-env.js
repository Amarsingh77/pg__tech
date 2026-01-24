import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('\n--- PG Tech Environment Diagnostic ---\n');

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
let allGood = true;

importantVars.forEach(v => {
    if (!checkVar(v)) allGood = false;
});

console.log('\n------------------------------------\n');

if (allGood) {
    console.log('👍 Basic configuration looks correct.');
    console.log('Run "node server/scripts/test-db-connection.js" to test the database connection.');
} else {
    console.log('⚠️ Some critical environment variables are missing!');
    console.log('Check your server/.env file or Vercel/Hosting configuration.');
}

console.log('\n--- End of Diagnostic ---\n');
