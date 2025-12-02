export interface Job {
  id: number;
  title: string;
  company: string;
  logo?: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  skills: string[];
  match: string | number;

  // Activity-related flags
  saved?: boolean;             // For Saved tab
  applied?: boolean;           // For Applied tab
  archived?: boolean;          // For Archived tab
  available?: boolean;         // Job availability flag (for Saved tab)
  status?: string;             // e.g. "Under Review", "Interview Scheduled"

  // Interview details
  interviewDetails?: {
    date: string;
    time: string;
    mode: string;
    place: string;
    interviewerName: string;
    interviewerPosition: string;
    link?: string;            // Interview link (Zoom / Meet)
    meetingLink?: string;     // fallback field name
  };
}
