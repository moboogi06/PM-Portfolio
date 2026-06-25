export interface KPICard {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface ImpactItem {
  title: string;
  subtitle: string;
  duration: string;
  metricLabel: string;
  metricValue: string;
  details: string[];
  stakeholders?: string[];
}

export interface ProjectResult {
  value: string;
  label: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  challenge: string;
  solutionOrRole: string;
  results: ProjectResult[];
  imageUrl?: string;
  imageOverlayText?: string;
  reportImage1?: string;
  reportImage2?: string;
  stakeholderMap?: {
    from: string;
    me: string;
    to: string[];
  };
  metrics?: { label: string; value: string }[];
  tags: string[];
  youtubeLinks?: {
    year2023: string;
    year2024: string;
    year2025: string;
  };
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}

export interface PortfolioData {
  hero: {
    title: string;
    headline: string;
    subheadline: string;
  };
  kpis: KPICard[];
  about: {
    title: string;
    description: string;
    coreValues: string[];
  };
  impact: {
    programManagement: ImpactItem;
    partnershipManagement: ImpactItem;
    riotCollaboration: ImpactItem;
  };
  featuredProjects: {
    chungnam: FeaturedProject;
    valorant: FeaturedProject;
    douyu: FeaturedProject;
  };
  skills: SkillItem[];
  timeline: TimelineEvent[];
  contact: ContactInfo;
}

export interface BilingualPortfolioData {
  en: PortfolioData;
  kr: PortfolioData;
}

