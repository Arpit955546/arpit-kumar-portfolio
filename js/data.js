// Portfolio content and public profile settings. Update these values directly in code.
export const profile = {
  name: "Arpit Kumar",
  photoPath: "assets/arpit-profile.jpg",
  degree: "B.Tech Computer Science & Engineering",
  collegeStartYear: "2023",
  graduationYear: 2027,
  college: "Galgotias College of Engineering & Technology",
  heroTitle: "Computer Science Student · Aspiring Software Developer",
  heroSummary: "I’m studying Computer Science & Engineering at Galgotias College of Engineering & Technology. I enjoy solving problems and building responsive web applications. I graduate in 2027.",
  aboutSummary: "I enjoy problem solving and have worked with C, C++, and core web technologies to build responsive web applications. I’m eager to apply my skills to real world projects and continue growing as a software developer.",
  currentlyLearning: "MongoDB Atlas · Data Structures & Algorithms",
  classXII: "82%",
  classXIIYear: "2021",
  classX: "83%",
  classXYear: "2019",
  schoolName: "Saraswati Vidya Mandir Inter College, Ram Sanehi Ghat",
  experienceTitle: "Professional experience",
  experienceSummary: "Add your internships and professional experience here.",
  achievementsTitle: "Certifications & achievements",
  achievementsSummary: "Certificates listed on my LinkedIn profile.",
  certifications: [
    { name: "Hacker Rank", issuer: "HackerRank", issued: "Sep 2025", credentialId: "25E240BBC68F" },
    { name: "HTML", issuer: "knowledgegate", issued: "Jun 2025" },
    { name: "Basic of python", issuer: "Infosys Springboard", issued: "Jan 2025" }
  ],
  interests: ["Data Structures & Algorithms", "Web Development", "AI"],
  resumePath: "assets/resume.pdf",
  contactEmail: "9555463148arpit@gmail.com",
  phone: "+91 95554 63148",
  social: {
    github: { label: "GitHub", username: "Arpit955546", url: "https://github.com/Arpit955546" },
    linkedin: { label: "LinkedIn", username: "arpit-kumar95", url: "https://www.linkedin.com/in/arpit-kumar95/" },
    leetcode: { label: "LeetCode", username: "arpit95coder", url: "https://leetcode.com/u/arpit95coder/" },
    codeforces: {
      label: "Codeforces", username: "arpit9555", url: "https://codeforces.com/profile/arpit9555",
      // Public API snapshot, fetched 2026-11-20; live data refreshes when the page opens.
      snapshot: { username: "arpit9555", checkedAt: "2026-11-20", rating: 405, maxRating: 405, rank: "newbie", contribution: 0, friends: 0, registeredYear: 2026, submissionsChecked: 42, solvedRecent: 17, acceptedRecent: 18, contestsRecent: 17 }
    },
    hackerrank: { label: "HackerRank", username: "", url: "" }
  }
};

export const skills = [
  { icon: "⌘", title: "Programming Languages", items: ["C", "C++"] },
  { icon: "▤", title: "Web Development", items: ["HTML", "CSS", "JavaScript", "Responsive UI"] },
  { icon: "⌬", title: "Problem Solving", items: ["Data Structures & Algorithms", "Competitive Programming"] },
  { icon: "◫", title: "Tools & Platforms", items: ["GitHub", "VS Code", "MongoDB Atlas · Learning"] }
];

export const foundations = ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "DBMS", "Computer Networks", "System Design"];

// Set status to "live", "completed", or "development". Keep links tied to verified deployments.
export const projects = [
  {
    id: "phishai", name: "PhishAI", subtitle: "Email Phishing Detection System", category: "AI & Security",
    status: "completed", description: "An email phishing detection system with a deployed sign-in page. Project details and implementation can be expanded when its repository is available.",
    technologies: ["Stack to be confirmed"],
    features: ["Email phishing detection system", "Deployed sign-in entry point"],
    demoUrl: "https://phishai-an-email-phishing-detecter.vercel.app/login.html", repoUrl: "", visual: "phish"
  },
  {
    id: "skypulse-weather", name: "SkyPulse Weather", subtitle: "Weather Forecast Dashboard", category: "Web Development",
    status: "completed", description: "A responsive weather app that searches by city or current location and shows current conditions, hourly weather, and a five-day forecast.",
    technologies: ["HTML", "CSS", "JavaScript", "Open-Meteo API", "Geolocation API"],
    features: ["Search weather by city", "Use current location with browser geolocation", "Current temperature, humidity, wind, and feels-like temperature", "Hourly weather and precipitation chance", "Interactive five-day forecast with selected-day hourly view", "Live local date and time"],
    demoUrl: "https://arpit955546.github.io/skypulse-weather/", repoUrl: "https://github.com/Arpit955546/skypulse-weather", visual: "weather"
  },
  {
    id: "scientific-calculator", name: "Scientific Calculator", subtitle: "Responsive Browser Calculator", category: "Web Development",
    status: "completed", description: "A responsive scientific calculator built with HTML, CSS, and JavaScript for everyday arithmetic and common scientific functions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: ["Basic arithmetic and parentheses", "Sine, cosine, and tangent in degrees", "Base-10 logarithm and square root", "π and e constants, percentage calculations", "Clear and delete controls with error handling"],
    demoUrl: "https://arpit955546.github.io/scientific-calculator/", repoUrl: "https://github.com/Arpit955546/scientific-calculator", visual: "calculator"
  },
  {
    id: "careertwin-ai", name: "CareerTwin AI", subtitle: "Career Intelligence & Hiring Ecosystem", category: "AI & Career Tech",
    status: "development", description: "An AI-powered career intelligence and hiring ecosystem, currently in development.",
    technologies: ["React", "Node.js", "MongoDB"],
    features: ["Career intelligence platform", "Hiring ecosystem", "In development"],
    demoUrl: "", repoUrl: "", visual: "career"
  },
  {
    id: "aktu-smart-lms", name: "AKTU Smart LMS", subtitle: "Learning Management System", category: "Education",
    status: "development", description: "A learning management system concept for AKTU students, currently in development.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: ["Learning management system for AKTU students", "In development"],
    demoUrl: "", repoUrl: "", visual: "education"
  }
];
