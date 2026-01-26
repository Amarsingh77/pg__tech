
import fetch from 'node-fetch';

const testEnrollmentReproduction = async () => {
    const baseUrl = 'http://localhost:5002';
    const endpoint = `${baseUrl}/api/enrollments`;

    const payload = {
        name: 'anar',
        email: 'sahilsinghinsa3@gmail.com',
        phone: '(+91-9306020546)',
        courseName: 'Surveying & Geomatics',
        status: 'Pending',
        enrollmentDate: new Date().toISOString()
    };

    console.log(`Testing Enrollment Reproduction at ${endpoint}...`);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Enrollment Reproduction Successful!');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('❌ Enrollment Reproduction Failed!');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
};

testEnrollmentReproduction();
