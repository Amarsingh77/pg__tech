
import fetch from 'node-fetch';

const testEnrollmentSubmission = async () => {
    const baseUrl = 'http://localhost:5002'; // Based on server/.env
    const endpoint = `${baseUrl}/api/enrollments`;

    const payload = {
        name: 'John Doe Enrollment Test',
        email: 'john.enroll@example.com',
        phone: '9876543210',
        courseName: 'Full Stack Development',
        status: 'Pending',
        enrollmentDate: new Date().toISOString()
    };

    console.log(`Testing Enrollment Submission at ${endpoint}...`);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Enrollment Submission Successful!');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('❌ Enrollment Submission Failed!');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
        console.log('Note: Ensure the backend server is running on port 5002.');
    }
};

testEnrollmentSubmission();
