import ftp from 'basic-ftp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CREDENTIALS - TO BE FILLED BY USER OR ENV
const config = {
    host: process.env.FTP_HOST || "ftp.your-site.com",
    user: process.env.FTP_USER || "username",
    password: process.env.FTP_PASSWORD || "password",
    secure: false, // Set to true for explicit FTPS
    // Remote path to upload to (e.g., /public_html)
    remoteRoot: process.env.FTP_ROOT || "/public_html"
};

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        console.log(`Connecting to ${config.host} as ${config.user}...`);
        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            secure: config.secure
        });

        console.log('Connected! Uploading dist folder...');

        // Local dist folder path (assuming run from project root or scripts folder)
        const localDir = path.join(__dirname, '../dist');
        const remoteDir = config.remoteRoot;

        await client.ensureDir(remoteDir);
        await client.clearWorkingDir(); // Optional: clear remote dir first? Maybe risky.

        // Upload the entire dist folder content to remoteDir
        await client.uploadFromDir(localDir, remoteDir);

        console.log('Deployment complete!');
    } catch (err) {
        console.error('Deployment failed:', err);
    }
    client.close();
}

deploy();
