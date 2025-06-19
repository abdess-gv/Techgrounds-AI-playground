
// Techgrounds Rooster data - legacy format for backward compatibility
export interface RoosterEntry {
  date: string;
  time: string;
  activity: string;
  location: string;
  link?: string;
}

// New types for the enhanced roster system
export interface AgendaEntry {
  sessionId: string;
  title: string;
  description: string;
  date: Date;
  dateString: string;
  time: string;
  location: LocationType;
  address?: string;
  trainer: string;
}

export type LocationType = "Online" | "Op locatie" | "Hybride";

export const techgroundsRooster: RoosterEntry[] = [
  {
    date: "2024-01-08",
    time: "09:00 - 17:00",
    activity: "Cloud Fundamentals & AWS Intro",
    location: "Online",
    link: "https://meet.example.com/cloud-intro"
  },
  {
    date: "2024-01-09",
    time: "09:00 - 17:00", 
    activity: "Linux Basics",
    location: "Online"
  },
  {
    date: "2024-01-10",
    time: "09:00 - 17:00",
    activity: "Networking Essentials",
    location: "Op locatie: Amsterdam"
  },
  {
    date: "2024-01-11",
    time: "09:00 - 12:00",
    activity: "Q&A and Review",
    location: "Online"
  },
  {
    date: "2024-01-12",
    time: "Self-study",
    activity: "AWS IAM Deep Dive",
    location: "Online"
  }
];

export default techgroundsRooster;
