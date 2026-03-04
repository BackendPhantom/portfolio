export interface Project {
  title: string;
  desc: string; // Short description for card
  fullDesc?: string; // Long description for Modal
  date?: string; // To sort by newest
  stack: string[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean; // Featured project badge
  status?: "active" | "completed" | "archived"; // Project status
  image?: string; // Optional project thumbnail
}

export interface Skill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  proficiency?: number; // 0-100 for skill bar
}

export interface SkillGroup {
  category: string;
  items: Skill[];
}

export interface PortfolioData {
  technicalSkills: SkillGroup[];
  softSkills: string[];
  projects: Project[];
}

// Stats for the home page
export interface Stats {
  yearsExperience: number;
  projectsCompleted: number;
  technologiesUsed: number;
}

export const stats: Stats = {
  yearsExperience: 3,
  projectsCompleted: 15,
  technologiesUsed: 12,
};

export const portfolioData: PortfolioData = {
  
  technicalSkills: [
    {
      category: "CORE STACK",
      items: [
        { name: "Python", level: "expert", proficiency: 95 },
        { name: "Django / DRF", level: "expert", proficiency: 90 },
        { name: "PostgreSQL", level: "advanced", proficiency: 85 },
        { name: "TypeScript", level: "intermediate", proficiency: 70 },
      ],
    },
    {
      category: "DEVOPS & CLOUD",
      items: [
        { name: "Docker", level: "advanced", proficiency: 85 },
        { name: "AWS (EC2/S3)", level: "intermediate", proficiency: 75 },
        { name: "CI/CD (GitHub Actions)", level: "advanced", proficiency: 80 },
        { name: "Nginx", level: "intermediate", proficiency: 70 },
      ],
    },
    {
      category: "ARCHITECTURE",
      items: [
        { name: "Microservices", level: "advanced", proficiency: 85 },
        { name: "System Design", level: "advanced", proficiency: 80 },
        { name: "REST APIs", level: "expert", proficiency: 95 },
        { name: "GraphQL", level: "intermediate", proficiency: 65 },
      ],
    },
  ],
  softSkills: [
    "Problem Solving",
    "Technical Writing",
    "Team Leadership",
    "Agile Communication",
    "Mentoring",
    "System Thinking",
  ],
  projects: [
    {
      title: "DevPortfolio CMS",
      desc: "A headless CMS designed specifically for developers. Decouples data from presentation.",
      fullDesc:
        "A robust Headless CMS architecture tailored for developers. It allows users to manage their portfolio content (projects, blogs, bio) via a clean dashboard and exposes a high-performance JSON API. Built with Django Rest Framework and optimized with Redis caching for sub-100ms response times.",
      stack: ["Django", "DRF", "PostgreSQL", "Redis", "Docker"],
      liveLink: "https://api.devportfolio.demo",
      githubLink: "https://github.com/suboms/dev-cms",
      date: "2024-12-01",
      featured: true,
      status: "active",
    },
    {
      title: "Real-time Chat Nexus",
      desc: "Scalable WebSocket server for high-concurrency messaging.",
      fullDesc:
        "Engineered a real-time messaging server capable of handling 10k+ concurrent connections. Utilizes FastAPI for asynchronous handling and Redis Pub/Sub to distribute messages across multiple worker nodes, ensuring scalability and fault tolerance.",
      stack: ["FastAPI", "WebSockets", "Redis", "Docker"],
      liveLink: "https://chat.demo.com",
      githubLink: "https://github.com/suboms/chat-nexus",
      date: "2024-11-15",
      featured: true,
      status: "active",
    },
    {
      title: "Legacy System Migration",
      desc: "Migrated a monolithic PHP app to microservices.",
      fullDesc:
        "Led the migration of a legacy PHP codebase to a modern Python microservices architecture. Implemented the Strangler Fig pattern to gradually replace functionality, resulting in a 40% reduction in server costs and improved maintainability.",
      stack: ["Python", "Flask", "PHP", "Kubernetes"],
      date: "2024-10-10",
      status: "completed",
    },
    {
      title: "E-commerce API",
      desc: "High-performance inventory management system.",
      fullDesc:
        "Developed a complex inventory API with optimistic locking to handle race conditions during flash sales. Integrated Stripe for payments and Celery for background order processing.",
      stack: ["Django", "Stripe", "Celery", "PostgreSQL"],
      githubLink: "#",
      date: "2024-09-05",
      status: "completed",
    },
    {
      title: "AI Text Summarizer",
      desc: "NLP service wrapper for summarization tasks.",
      fullDesc:
        "Built a wrapper service around HuggingFace transformers to provide text summarization endpoints. Optimized model loading time and implemented request queuing.",
      stack: ["Python", "PyTorch", "FastAPI"],
      date: "2024-08-20",
      status: "completed",
    },
    {
      title: "Log Aggregator",
      desc: "Centralized logging service for distributed systems.",
      fullDesc:
        "A custom log aggregation tool that collects logs from multiple services via UDP, formats them, and stores them in Elasticsearch for visualization in Kibana.",
      stack: ["Go", "Elasticsearch", "Kibana"],
      date: "2024-07-15",
      status: "completed",
    },
    {
      title: "Old Portfolio",
      desc: "My first HTML/CSS portfolio.",
      fullDesc:
        "The humble beginnings. A static site built with raw HTML and CSS.",
      stack: ["HTML", "CSS"],
      date: "2023-01-01",
      status: "archived",
    },
  ],
};
