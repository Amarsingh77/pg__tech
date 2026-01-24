import { Code, Database, Globe, Server, Settings, PenTool, Truck, Wrench, Home, Map, Ruler, HardHat } from 'lucide-react';

export const cseCourses = [
    {
        id: 'cse-full-stack',
        title: 'Full Stack Development',
        icon: Globe,
        desc: 'Master MERN stack and build modern web apps.',
        image: '/images/hologram/full_stack.png',
        details: {
            duration: '6 Months',
            level: 'Beginner to Advanced',
            curriculum: [
                'HTML, CSS, JavaScript Fundamentals',
                'React.js for Frontend Development',
                'Node.js and Express for Backend',
                'MongoDB Database Management',
                'Deployment and DevOps Basics'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'cse-dsa',
        title: 'Data Structures & Algo',
        icon: Code,
        desc: 'Ace coding interviews with deep DSA knowledge.',
        image: '/images/hologram/dsa.png',
        details: {
            duration: '4 Months',
            level: 'Intermediate',
            curriculum: [
                'Arrays, Linked Lists, Stacks, Queues',
                'Trees, Graphs, Heaps',
                'Dynamic Programming',
                'Greedy Algorithms',
                'Time and Space Complexity'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'cse-cloud',
        title: 'Cloud Computing',
        icon: Server,
        desc: 'Learn AWS, Azure, and DevOps practices.',
        image: '/images/hologram/cloud.png',
        details: {
            duration: '5 Months',
            level: 'Intermediate',
            curriculum: [
                'Cloud Concepts and Architecture',
                'AWS Core Services (EC2, S3, RDS)',
                'Docker and Kubernetes',
                'CI/CD Pipelines',
                'Infrastructure as Code (Terraform)'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'cse-dbms',
        title: 'Database Management',
        icon: Database,
        desc: 'Design scalable databases with SQL and NoSQL.',
        image: '/images/hologram/dbms.png',
        details: {
            duration: '3 Months',
            level: 'Beginner',
            curriculum: [
                'Relational Database Design (SQL)',
                'Normalization and Indexing',
                'NoSQL Databases (MongoDB, Redis)',
                'Database Administration',
                'Performance Tuning'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    }
];

export const meCourses = [
    {
        id: 'me-autocad',
        title: 'AutoCAD & SolidWorks',
        icon: PenTool,
        desc: 'Master 2D drafting and 3D modeling tools.',
        image: '/images/hologram/autocad.png',
        details: {
            duration: '3 Months',
            level: 'Beginner',
            curriculum: [
                'AutoCAD Interface and Basic Drawing',
                'Advanced Drafting Techniques',
                'SolidWorks 3D Modeling',
                'Assembly and Simulation',
                'Rendering and Presentation'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'me-robotics',
        title: 'Robotics & Automation',
        icon: Settings,
        desc: 'Build and program intelligent robots.',
        image: '/images/hologram/robotics.png',
        details: {
            duration: '6 Months',
            level: 'Advanced',
            curriculum: [
                'Introduction to Robotics',
                'Sensors and Actuators',
                'Microcontrollers (Arduino/Raspberry Pi)',
                'Kinematics and Dynamics',
                'Robot Programming (ROS)'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'me-automobile',
        title: 'Automobile Engineering',
        icon: Truck,
        desc: 'Understand vehicle dynamics and engine systems.',
        image: '/images/hologram/automobile.png',
        details: {
            duration: '4 Months',
            level: 'Intermediate',
            curriculum: [
                'Internal Combustion Engines',
                'Vehicle Aerodynamics',
                'Transmission Systems',
                'Electric Vehicle Technology',
                'Automotive Safety Systems'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'me-maintenance',
        title: 'Industrial Maintenance',
        icon: Wrench,
        desc: 'Learn machinery upkeep and safety protocols.',
        image: '/images/hologram/maintenance.png',
        details: {
            duration: '3 Months',
            level: 'Beginner',
            curriculum: [
                'Preventive Maintenance Strategies',
                'Hydraulics and Pneumatics',
                'Industrial Safety Standards',
                'Troubleshooting Techniques',
                'Maintenance Management Systems'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    }
];

export const ceCourses = [
    {
        id: 'ce-structural',
        title: 'Structural Analysis',
        icon: Home,
        desc: 'Analyze and design safe structures.',
        image: '/images/hologram/structural.png',
        details: {
            duration: '5 Months',
            level: 'Advanced',
            curriculum: [
                'Statics and Strength of Materials',
                'Structural Analysis Methods',
                'Reinforced Concrete Design',
                'Steel Structure Design',
                'Seismic Analysis'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'ce-surveying',
        title: 'Surveying & Geomatics',
        icon: Map,
        desc: 'Master land surveying techniques and GPS.',
        image: '/images/hologram/surveying.png',
        details: {
            duration: '3 Months',
            level: 'Beginner',
            curriculum: [
                'Linear and Angular Measurements',
                'Leveling and Contouring',
                'Total Station Surveying',
                'GPS and GIS Applications',
                'Remote Sensing Basics'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'ce-construction',
        title: 'Construction Management',
        icon: HardHat,
        desc: 'Plan and execute construction projects efficiently.',
        image: '/images/hologram/construction.png',
        details: {
            duration: '6 Months',
            level: 'Intermediate',
            curriculum: [
                'Project Planning and Scheduling',
                'Cost Estimation and Budgeting',
                'Construction Safety and Law',
                'Quality Control',
                'Green Building Practices'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    },
    {
        id: 'ce-autocad',
        title: 'AutoCAD for Civil',
        icon: Ruler,
        desc: 'Create precise architectural and engineering drawings.',
        image: '/images/hologram/autocad_civil.png',
        details: {
            duration: '3 Months',
            level: 'Beginner',
            curriculum: [
                'Architectural Drafting Standards',
                'Floor Plans and Elevations',
                'Sectional Views',
                '3D Modeling for Civil',
                'Plotting and Printing'
            ],
            syllabusPdf: '/curriculum/sample_curriculum.pdf'
        }
    }
];

export const allCourses = [...cseCourses, ...meCourses, ...ceCourses];

export const getCourseById = (id) => allCourses.find(course => course.id === id);
