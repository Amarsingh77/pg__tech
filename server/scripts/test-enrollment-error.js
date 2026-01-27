
import fetch from 'node-fetch';

const testEnrollmentError = async () => {
    const baseUrl = 'http://localhost:5002'; // Based on server/.env
    const endpoint = `${baseUrl}/api/enrollments`;

    const payload = {
        name: 'Error Test',
        email: 'error@example.com',
        phone: '12345',
        courseName: 'Test Course',
        status: 'InvalidStatus' // This should trigger a validation error
    };

    console.log(`Testing Enrollment ERROR Handling at ${endpoint}...`);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (response.status === 400 && (data.message === 'Validation failed' || data.message === 'Validation Error')) {
            console.log('✅ Correctly handled validation error with 400 status.');
        } else {
            console.error('❌ Error handling verification failed.');
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
};

testEnrollmentError();
