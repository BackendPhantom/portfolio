export interface PersonalInfo {
  name: string;
  title: string;
  region: string;
  summary: string;
  bio: string;
  currentProcess: string;
  environmentStack: string[];
}

export interface EngineeringTenet {
  id: string;
  icon: string;
  label: string;
  title: string;
  description: string;
}

export interface SkillItem {
  name: string;
  status?: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface LiveLink {
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveLink?: LiveLink;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  socials: SocialLink[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  engineeringTenets: EngineeringTenet[];
  featuredProjects: Project[];
  otherProjects: Project[];
  skills: SkillGroup[];
  contact: ContactInfo;
}