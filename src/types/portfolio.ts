export interface SocialLink {
  label: string;
  url: string;
}

export interface SkillGroup {
  category: string;
  summary: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
  linkLabel?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    initials: string;
    headline: string;
    subheadline: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    avatarUrl: string;
    resumeUrl: string;
    availability: string;
  };
  navigation: Array<{ label: string; target: string }>;
  stats: Array<{ value: string; label: string }>;
  skillGroups: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  githubApiUrl: string;
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
}
