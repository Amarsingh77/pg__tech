
import fetch from 'node-fetch';

const testDemoSubmission = async () => {
    const baseUrl = 'http://localhost:5002'; // Based on server/.env
    const endpoint = `${baseUrl}/api/enquiries`;

    const payload = {
        type: 'demo',
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        data: {
            course: 'full-stack-development',
            mode: 'online',
            date: '2026-02-01',
            time: 'morning'
        }
    };

    console.log(`Testing Demo Submission at ${endpoint}...`);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Demo Submission Successful!');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('❌ Demo Submission Failed!');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
        console.log('Note: Ensure the backend server is running on port 5002.');
    }
};

testDemoSubmission();
