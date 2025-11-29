// /types/jobs.ts
export type ApplicantStatus =
  | "New"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Hired";

export type Applicant = {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  experience: string;
  status: ApplicantStatus;
};

export type JobAnalyticsPoint = {
  label: string; // e.g. "M", "T", "W"
  value: number; // views that day
};

export type JobStatus = "Active" | "Draft" | "Closed";

export type Job = {
  id: string;
  title: string;
  location: string;
  department: string;
  workSetup: "On-site" | "Hybrid" | "Remote";
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salaryRange: string;
  postedAgo: string;
  status: JobStatus;
  views: number;
  applicants: Applicant[];
  tags: string[];
  description: string;
  experienceLevel: string;
  analytics: JobAnalyticsPoint[];
};