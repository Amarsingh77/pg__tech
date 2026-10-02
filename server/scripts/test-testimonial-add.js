import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

const testTestimonialAdd = async () => {
    const baseUrl = 'http://localhost:5002'; // Based on server/.env

    // 1. First logging in to get token (using default admin)
    console.log('Logging in...');
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@techinstitute.com', password: 'admin123' })
    });

    const loginData = await loginRes.json();
    if (!loginData.success && !loginData.otp) {
        console.error('Login failed:', loginData);
        return;
    }

    let token = loginData.token;
    if (loginData.otp) {
        console.log(`OTP Required. Using OTP: ${loginData.otp}`);
        const otpRes = await fetch(`${baseUrl}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@techinstitute.com', otp: loginData.otp })
        });
        const otpData = await otpRes.json();
        token = otpData.token;
    }

    console.log('Token acquired:', token ? 'Yes' : 'No');

    // 2. Add Testimonial
    const form = new FormData();
    form.append('name', 'Test User');
    form.append('role', 'Developer');
    form.append('quote', 'This is a test testimonial.');
    form.append('rating', 5);
    // Note: Not attaching image for basic test, or creating dummy buffer if needed

    console.log('Adding testimonial...');
    const res = await fetch(`${baseUrl}/api/testimonials`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
            // FormData headers are set automatically by form-data lib
        },
        body: form
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
};

testTestimonialAdd();
