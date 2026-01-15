# PG Tech Education Platform with Admin Authentication (Vercel + Hostinger)
A modern, production-ready educational platform built with React (frontend) and Node.js/Express (backend) with MongoDB. Features course management, student enrollment, AI-powered career guidance, and a comprehensive admin dashboard.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI**: Built with React 19, Tailwind CSS, and Framer Motion
- **Responsive Design**: Mobile-first approach with beautiful animations
- **AI Career Advisor**: Integrated with Google Gemini API for personalized course recommendations
- **Admin Dashboard**: Complete CMS for managing courses, enrollments, and testimonials
- **Real-time Updates**: Live data synchronization with backend APIs

### Backend (Node.js + Express)
- **RESTful APIs**: Well-structured API endpoints with proper validation
- **Authentication & Authorization**: JWT-based auth with role-based permissions
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Comprehensive error handling and logging

### Core Features
- ✅ Course Management (CRUD operations)
- ✅ Student Enrollment System
- ✅ Testimonial Management
- ✅ Batch Scheduling
- ✅ AI-Powered Career Guidance
- ✅ Admin Analytics Dashboard
- ✅ Responsive Design
- ✅ Production Ready

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
techinstitute-fullstack/
├── src/                          # Frontend React app
│   ├── components/               # Reusable components
│   │   ├── admin/               # Admin-specific components
│   │   ├── landing/             # Landing page components
│   │   ├── modals/              # Modal components
│   │   └── shared/              # Shared components
│   ├── services/                # API service layer
│   ├── utils/                   # Utility functions
│   └── pages/                   # Page components
├── server/                      # Backend Node.js app
│   ├── controllers/             # Route controllers
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   ├── middleware/              # Custom middleware
│   ├── config/                  # Configuration files
│   └── server.js                # Main server file
├── public/                      # Static assets
├── env.example                  # Frontend environment variables
├── server/env.example          # Backend environment variables
└── package.json                # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm run setup
   ```

2. **Environment Setup**

   **Frontend (.env.local):**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Backend (server/.env):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/techinstitute
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system.

4. **Run the application**
   ```bash
   # Run both frontend and backend simultaneously
   npm run dev:full
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Login: Click "Admin Login" in footer (username: admin, password: admin)

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/testimonials` - Get testimonials
- `GET /api/batches` - Get batches
- `POST /api/enrollments` - Submit enrollment

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/enrollments` - Get all enrollments
- `POST /api/courses` - Create course
- And more...

## 🔐 Admin Access

**Default Admin Credentials:**
- Username: admin
- Password: admin

**Location:** Click "Admin Login" in the website footer

## 📱 Features Overview

### For Students
- **Stream-based browsing** - Choose your engineering discipline (CSE, ME, CE, EE, ECE)
- Browse courses with detailed information
- Advanced search and filtering within streams
- **Free AI Career Advisor** - Get personalized course recommendations
- Easy enrollment process
- Responsive mobile experience

### For Admins
- Complete dashboard with analytics
- Manage streams, courses, testimonials, and batches
- Approve/reject student enrollments
- Real-time data insights
- Dynamic stream management

## 🤖 **TechAI - India's Most Advanced AI Career Advisor**

The website features **TechAI**, India's most advanced AI career advisor integrated into the TechInstitute platform. TechAI acts like a human career counselor - friendly, motivating, and supportive - providing personalized career guidance with Indian market focus.

### Core Capabilities
- **Personalized Roadmaps**: Step-by-step career paths from Beginner → Intermediate → Advanced
- **Indian Career Focus**: Salary expectations, job market insights, local hiring platforms
- **Tech & Non-Tech Careers**: Comprehensive coverage across all career fields
- **Student Guidance**: Special roadmaps for 8th, 10th, 12th grade students and freshers
- **Career Transition**: Guidance for working professionals changing careers

### Response Style
TechAI responds like a human counselor:
- **Motivational & Friendly**: Uses encouraging language and emojis
- **Simple English**: Avoids technical jargon, explains concepts clearly
- **Practical Focus**: Provides real project ideas and actionable steps
- **Indian Context**: References Naukri, LinkedIn, Internshala, local salary ranges

### Supported Career Paths
**Tech Careers:**
- Web Development (Frontend, Backend, Full-stack)
- Data Science, AI & Machine Learning
- Cybersecurity & Ethical Hacking
- Cloud Computing & DevOps
- Software Testing (Manual + Automation)
- Mobile App Development (Flutter, React Native)
- UI/UX Design & Digital Marketing

**Non-Tech & Other:**
- BPO/KPO Career paths
- Career transition for working professionals
- Student guidance (8th, 10th, 12th class)
- Freelancing and business guidance

### Course Selection Process
When users ask "Which course should I choose?", TechAI asks:
1. **Past Education** - Current education level and background
2. **Interests** - Tech/Non-tech preferences
3. **Daily Study Time** - Available time commitment
4. **Budget** - Low/Medium/No limit for learning
5. **Goals** - Job, freelancing, business, or abroad

### Structured Response Format
Every TechAI response includes:
- **Title**: Recommended Career Path
- **Explanation**: Why this career + real-world analogy
- **Step-by-Step Roadmap**: Beginner → Intermediate → Advanced phases
- **Required Skills**: Essential competencies
- **Tools & Software**: Practical tools to learn
- **Projects**: 5 real portfolio project ideas
- **Resume & LinkedIn**: Optimization tips
- **Interview Prep**: Preparation flow
- **Indian Salary**: LPA ranges for freshers and experienced
- **Job Platforms**: Naukri, LinkedIn, Internshala recommendations

### Example TechAI Response
```
🎯 Recommended Career Path: Full-Stack Web Development

Why Web Development? It's like being the architect of the digital world! You build websites and apps that millions use daily. The demand is huge, and you can work from anywhere.

📚 Step-by-Step Roadmap:

🟢 BEGINNER (2-3 months)
• HTML & CSS - Learn to structure and style web pages
• JavaScript Basics - Make websites interactive
• Git & GitHub - Version control for your code

🟡 INTERMEDIATE (3-4 months)
• Frontend: React.js for modern interfaces
• Backend: Node.js & Express for server-side logic
• Database: MongoDB for data storage

🟠 ADVANCED (3-6 months)
• Full-Stack Integration with APIs
• Cloud Deployment (Vercel, Netlify)
• Performance Optimization

💰 Salary in India: ₹3-8 LPA for freshers, ₹8-25 LPA with experience.

🏢 Apply on: Naukri.com, LinkedIn, Internshala, company career pages.
```

### Accessing TechAI
1. Click the **"AI Career Advisor"** button on the homepage
2. Ask about any career path or use "Which course should I choose?"
3. Receive personalized, step-by-step guidance with Indian market insights

### TechAI Philosophy
- **Human-like**: Feels like chatting with a friendly career counselor
- **Practical**: Focuses on real projects, skills, and job opportunities
- **Indian Focus**: Salary in LPA, local job platforms, Indian market context
- **Motivational**: Encourages and builds confidence throughout the journey
- **Actionable**: Every response includes specific next steps and resources

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run server           # Start backend dev server
npm run dev:full         # Start both frontend and backend

# Production
npm run build           # Build frontend for production
npm run server:prod     # Start backend in production mode

# Setup
npm run setup           # Install all dependencies
npm run install:server  # Install backend dependencies only
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the 'dist' folder to Vercel, Netlify, or AWS S3
```

### Backend Deployment
```bash
cd server
npm start
# Deploy to Heroku, Railway, or AWS EC2
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the future of education**
