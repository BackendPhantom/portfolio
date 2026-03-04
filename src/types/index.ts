// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string;
  title: string;
  bio: string;
  location: string;
  website: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  years_of_experience: number;
  is_available_for_hire: boolean;
  is_open_to_freelance: boolean;
  is_profile_public: boolean;
  has_complete_profile: boolean;
  email_verified: boolean;
  phone_number: string;
  date_of_birth: string | null;
  created_at: string;
  updated_at: string;
  auth_provider: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  sub_category: string;
}

export interface ApiProject {
  id: string;
  title: string;
  description: string;
  tech_stack_display: TechStackItem[];
  live_url?: string;
  github_url?: string;
  created_at?: string;
  updated_at?: string;
  user?: string;
  // Future-proofing — not yet returned by API
  featured?: boolean;
  image?: string;
  status?: "active" | "completed" | "archived";
}

export interface ApiSkill {
  id: string;
  name: string;
  category: "soft skills" | "technical skills";
  sub_category: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─── Static / Legacy Types ───────────────────────────────────────────────────

export interface Project {
  title: string;
  desc: string;
  fullDesc?: string;
  date?: string;
  stack: string[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
  status?: "active" | "completed" | "archived";
  image?: string;
}

export interface Skill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  proficiency?: number;
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

export interface Stats {
  yearsExperience: number;
  projectsCompleted: number;
  technologiesUsed: number;
}

// ─── Component Prop Types ────────────────────────────────────────────────────

export type BackgroundType =
  | "matrix"
  | "particles"
  | "gradient"
  | "coderain"
  | "grid"
  | "constellation";

export type ViewMode = "ui" | "json";
