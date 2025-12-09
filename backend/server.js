const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auth routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'PG Tech API is running!',
        endpoints: {
            auth: '/api/auth',
            courses: '/api/courses',
            batches: '/api/batches',
            testimonials: '/api/testimonials',
            gallery: '/api/gallery',
            enrollments: '/api/enrollments'
        }
    });
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Data Files
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const files = {
    courses: path.join(DATA_DIR, 'courses.json'),
    batches: path.join(DATA_DIR, 'batches.json'),
    testimonials: path.join(DATA_DIR, 'testimonials.json'),
    gallery: path.join(DATA_DIR, 'gallery.json'),
    enrollments: path.join(DATA_DIR, 'enrollments.json')
};

// Helper to read/write data
const readData = (file) => {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
};

const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Routes

// --- Courses ---
app.get('/api/courses', (req, res) => {
    res.json(readData(files.courses));
});

app.post('/api/courses', upload.single('image'), (req, res) => {
    const courses = readData(files.courses);
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.image;

    const newCourse = {
        id: Date.now(),
        ...req.body,
        image: imageUrl
    };
    courses.push(newCourse);
    writeData(files.courses, courses);
    res.json(newCourse);
});

app.put('/api/courses/:id', upload.single('image'), (req, res) => {
    const courses = readData(files.courses);
    const index = courses.findIndex(c => c.id == req.params.id);
    if (index !== -1) {
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : (req.body.image || courses[index].image);
        courses[index] = { ...courses[index], ...req.body, image: imageUrl };
        writeData(files.courses, courses);
        res.json(courses[index]);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.delete('/api/courses/:id', (req, res) => {
    let courses = readData(files.courses);
    courses = courses.filter(c => c.id != req.params.id);
    writeData(files.courses, courses);
    res.json({ message: 'Course deleted' });
});

// --- Batches ---
app.get('/api/batches', (req, res) => {
    res.json(readData(files.batches));
});

app.post('/api/batches', (req, res) => {
    const batches = readData(files.batches);
    const newBatch = { id: Date.now(), ...req.body };
    batches.push(newBatch);
    writeData(files.batches, batches);
    res.json(newBatch);
});

app.put('/api/batches/:id', (req, res) => {
    const batches = readData(files.batches);
    const index = batches.findIndex(b => b.id == req.params.id);
    if (index !== -1) {
        batches[index] = { ...batches[index], ...req.body };
        writeData(files.batches, batches);
        res.json(batches[index]);
    } else {
        res.status(404).json({ message: 'Batch not found' });
    }
});

app.delete('/api/batches/:id', (req, res) => {
    let batches = readData(files.batches);
    batches = batches.filter(b => b.id != req.params.id);
    writeData(files.batches, batches);
    res.json({ message: 'Batch deleted' });
});

// --- Testimonials ---
app.get('/api/testimonials', (req, res) => {
    res.json(readData(files.testimonials));
});

app.post('/api/testimonials', upload.single('image'), (req, res) => {
    const testimonials = readData(files.testimonials);
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.image;

    const newTestimonial = {
        id: Date.now(),
        ...req.body,
        image: imageUrl
    };
    testimonials.push(newTestimonial);
    writeData(files.testimonials, testimonials);
    res.json(newTestimonial);
});

app.put('/api/testimonials/:id', upload.single('image'), (req, res) => {
    const testimonials = readData(files.testimonials);
    const index = testimonials.findIndex(t => t.id == req.params.id);
    if (index !== -1) {
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : (req.body.image || testimonials[index].image);
        testimonials[index] = { ...testimonials[index], ...req.body, image: imageUrl };
        writeData(files.testimonials, testimonials);
        res.json(testimonials[index]);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

app.delete('/api/testimonials/:id', (req, res) => {
    let testimonials = readData(files.testimonials);
    testimonials = testimonials.filter(t => t.id != req.params.id);
    writeData(files.testimonials, testimonials);
    res.json({ message: 'Testimonial deleted' });
});

// --- Gallery ---
app.get('/api/gallery', (req, res) => {
    res.json(readData(files.gallery));
});

app.post('/api/gallery', upload.single('image'), (req, res) => {
    const gallery = readData(files.gallery);
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.url;

    const newImage = {
        id: Date.now(),
        title: req.body.title,
        category: req.body.category,
        url: imageUrl
    };

    gallery.push(newImage);
    writeData(files.gallery, gallery);
    res.json(newImage);
});

app.delete('/api/gallery/:id', (req, res) => {
    let gallery = readData(files.gallery);
    const imageToDelete = gallery.find(img => img.id == req.params.id);

    // Optional: Delete file from uploads if it exists
    if (imageToDelete && imageToDelete.url.includes('/uploads/')) {
        const filename = imageToDelete.url.split('/uploads/')[1];
        const filePath = path.join(__dirname, 'uploads', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    gallery = gallery.filter(img => img.id != req.params.id);
    writeData(files.gallery, gallery);
    res.json({ message: 'Image deleted' });
});

// --- Enrollments ---
app.get('/api/enrollments', (req, res) => {
    res.json(readData(files.enrollments));
});

app.post('/api/enrollments', (req, res) => {
    const enrollments = readData(files.enrollments);
    const newEnrollment = { id: Date.now(), ...req.body };
    enrollments.push(newEnrollment);
    writeData(files.enrollments, enrollments);
    res.json(newEnrollment);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
