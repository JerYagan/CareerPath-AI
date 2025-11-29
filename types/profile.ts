// types/profile.ts

export interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface RoadmapGoal {
  title: string;
  status: "Not Started" | "In Progress" | "Completed" | string;
  progress: number;
  deadline: string;
}

export interface Education {
  degree: string;
  school: string;
  years: string;
}

export interface Certificate {
  name: string;
  organization: string;
  year: number | string;
}

export interface Resume {
  fileName: string;
  url: string;
}

export interface ProfileBase {
  name: string;
  position: string;
  location: string;
  email: string;
  phone: string;
  description: string;
  profilePicture: string;

  overview: string;

  company?: string | null;
  openToWork?: boolean;

  experience: Experience[];
  skills: Skill[];
  roadmap: RoadmapGoal[];
  certifications: Certificate[];
  education: Education[];
  languages: string[];
  resume: Resume;

  // JSON won’t have this at first
  completion?: number;
}

export type Profile = ProfileBase & {
  completion: number;
};