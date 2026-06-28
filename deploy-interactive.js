import ftp from 'basic-ftp';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('\n🚀 PG Tech Frontend FTP Deployer\n');
    
    const host = await question('Enter FTP Host (e.g. ftp.pgtech.in): ');
    const user = await question('Enter FTP User: ');
    const password = await question('Enter FTP Password: ');
    const remoteRoot = (await question('Enter Remote Root Path (default: /public_html): ')).trim() || '/public_html';
    
    rl.close();

    if (!host || !user || !password) {
        console.error('\n❌ Error: FTP Host, User, and Password are required.');
        process.exit(1);
    }

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        console.log(`\nConnecting to ${host} as ${user}...`);
        await client.access({
            host,
            user,
            password,
            secure: false
        });

        console.log('Connected! Uploading dist folder...');
        const localDir = path.join(__dirname, 'dist');
        
        await client.ensureDir(remoteRoot);
        // Clear remote directory first to avoid old files clashing
        await client.clearWorkingDir();
        await client.uploadFromDir(localDir, remoteRoot);
        
        console.log('\n✅ Deployment completed successfully!');
    } catch (err) {
        console.error('\n❌ Deployment failed:', err.message);
    } finally {
        client.close();
    }
}

main();
