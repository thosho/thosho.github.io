const DATA = {
    // Current active video module mockup
    currentVideo: {
        title: "Rotational Mechanics - Part 1",
        subject: "Physics",
        instructor: "Dr. H.C. Verma Alumni",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&auto=format&fit=crop", // chalkboard physics
        duration: "1h 15m",
        progress: 45 // percentage
    },

    // Curriculum for the sidebar
    curriculum: [
        {
            title: "Module 1: Kinematics",
            completed: true,
            videos: [
                { title: "1.1 Motion in a Straight Line", duration: "45m", status: "completed" },
                { title: "1.2 Projectile Motion", duration: "55m", status: "completed" }
            ]
        },
        {
            title: "Module 2: Laws of Motion",
            completed: true,
            videos: [
                { title: "2.1 Newton's First & Second Law", duration: "1h", status: "completed" },
                { title: "2.2 Friction & Dynamics", duration: "50m", status: "completed" }
            ]
        },
        {
            title: "Module 3: Rotational Mechanics",
            completed: false,
            videos: [
                { title: "3.1 Center of Mass", duration: "40m", status: "completed" },
                { title: "3.2 Torque and Angular Momentum", duration: "1h 15m", status: "watching" },
                { title: "3.3 Rolling Friction", duration: "45m", status: "locked" }
            ]
        },
        {
            title: "Module 4: Thermodynamics",
            completed: false,
            videos: [
                { title: "4.1 Laws of Thermodynamics", duration: "1h", status: "locked" },
                { title: "4.2 Heat Transfer", duration: "55m", status: "locked" }
            ]
        }
    ],

    // Performance Analytics
    analytics: {
        overall: 78, // mock test average
        subjects: [
            { name: "Physics", score: 85, color: "#6366f1" },
            { name: "Chemistry", score: 92, color: "#10b981" },
            { name: "Mathematics", score: 65, color: "#f59e0b" }
        ],
        recentTests: [
            { name: "Mock Test 4 (Full Syllabus)", score: 215, max: 300, date: "12 Oct" },
            { name: "Mock Test 3 (Part Syllabus)", score: 240, max: 300, date: "05 Oct" },
            { name: "Mock Test 2 (Part Syllabus)", score: 195, max: 300, date: "28 Sep" }
        ]
    },

    // Course Catalog / Upskilling
    courses: [
        {
            id: "c1",
            title: "JEE Advanced Target 2026",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop",
            tag: "Engineering",
            enrolled: true,
            progress: 68
        },
        {
            id: "c2",
            title: "NEET UG Foundation",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop",
            tag: "Medical",
            enrolled: false,
            progress: 0
        },
        {
            id: "c3",
            title: "UPSC CSE Masterclass",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop",
            tag: "Civil Services",
            enrolled: false,
            progress: 0
        },
        {
            id: "c4",
            title: "Data Science & AI Certification",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop",
            tag: "Tech Upskill",
            enrolled: false,
            progress: 0
        }
    ],

    // Leaderboard
    leaderboard: [
        { rank: 1, name: "Priya S.", points: 15420, change: "up" },
        { rank: 2, name: "Rahul M.", points: 14890, change: "same" },
        { rank: 3, name: "Aditi K.", points: 14200, change: "up" },
        { rank: 4, name: "Vikram R.", points: 13950, change: "down" },
        { rank: 5, name: "Anjali D.", points: 13800, change: "up" }
    ]
};
