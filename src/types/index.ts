// ==========================================
// PORTFOLIO CENTRAL DATA MODELS & TYPES
// ==========================================

// --- Project Types ---
export interface ArchitectureDiagram {
  title: string;
  src: string;
  caption: string;
}

export interface PipelineStep {
  title: string;
  sub: string;
  icon: string;
}

export interface ProjectMetric {
  num: string;
  label: string;
  icon?: string;
}

export interface ProjectChallenge {
  title: string;
  desc: string;
}

export interface Project {
  id: string; // 'recruiter' | 'vault' | 'route'
  number: string; // '01', '02', '03'
  title: string;
  label: string;
  category: 'python' | 'java' | 'dsa' | 'cloud';
  featured?: boolean;
  description: string;
  overview: string;
  diagrams: ArchitectureDiagram[];
  pipeline: PipelineStep[];
  metrics: ProjectMetric[];
  challenges: ProjectChallenge[];
  tags: string[];
  github: string;
  demoUrl?: string;
}

// --- Skill Types ---
export interface SkillItem {
  name: string;
  sub: string;
  icon?: string;
  level?: number;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string; // 'python' | 'java' | 'database' | 'web' | 'devops'
  title: string;
  badge?: string;
  skills: SkillItem[];
}

// --- Experience Types ---
export interface SubProject {
  title: string;
  icon?: string;
  tech: string;
  tasks: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  division?: string;
  period: string;
  location?: string;
  subprojects: SubProject[];
}

export type Experience = ExperienceItem;

// --- Education Types ---
export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score: string;
  details?: string;
}

export type Education = EducationItem;

// --- Certificate Types ---
export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  pdfUrl?: string;
  badge?: string;
  skills?: string[];
}

export type Certificate = CertificateItem;

// --- Profile & Recruiter Types ---
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email' | 'phone';
  url: string;
  label: string;
  icon?: string;
}

export interface RecruiterStat {
  value: string;
  label: string;
  numericTarget?: number;
  suffix?: string;
  prefix?: string;
}

export interface ProfileData {
  name: string;
  preferredName?: string;
  headline: string;
  subheadline?: string;
  tagline: string;
  typewriterTexts: string[];
  summary: string;
  email: string;
  phone: string;
  location: string;
  degree: string;
  university: string;
  graduationYear: string;
  status: string;
  statusAvailable: boolean;
  socialLinks: SocialLink[];
  recruiterStats: RecruiterStat[];
  resumeUrl: string;
  avatarUrl: string;
}
