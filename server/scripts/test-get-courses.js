
import fetch from 'node-fetch';

const testGetCourses = async () => {
    const baseUrl = 'http://localhost:5002'; // Based on server/.env
    const endpoint = `${baseUrl}/api/courses?homePage=true&limit=8&sort=order`;

    console.log(`Testing getCourses at ${endpoint}...`);

    try {
        const response = await fetch(endpoint, {
            headers: { 'Cache-Control': 'no-cache' }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ getCourses Successful!');
            console.log(`Received ${data.data?.length} courses out of ${data.total} total.`);

            // Check for EE and ECE
            const streams = data.data.map(c => c.stream);
            console.log('Streams present:', [...new Set(streams)].join(', '));

            if (streams.includes('EE') && streams.includes('ECE')) {
                console.log('✅ EE and ECE courses are present in the response.');
            } else {
                console.log('⚠️ EE or ECE courses might be missing from the top 8 homePage courses.');
            }
        } else {
            console.error('❌ getCourses Failed!');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
};

testGetCourses();
