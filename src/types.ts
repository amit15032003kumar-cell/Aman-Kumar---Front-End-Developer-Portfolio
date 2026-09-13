export interface Project {
  id: string | number;
  name: string;
  title: string;
  description: string;
  detailedDescription: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  repoUrl: string;
  liveUrl?: string;
  topics: string[];
  category: 'web' | 'tool' | 'mobile' | 'utility';
  featured: boolean;
  highlights: string[];
  previewGradient: string;
  updatedAt?: string;
}

export interface StudentInfo {
  name: string;
  title: string;
  college: string;
  collegeShort: string;
  affiliation: string;
  degree: string;
  year: string;
  session: string;
  rollNo: string;
  location: string;
  city: string;
  state: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  instagramUsername: string;
  instagramUrl: string;
  linkedinUsername: string;
  linkedinUrl: string;
  specialization: string;
  status: string;
  bio: string;
  photoUrl: string;
}

export type ThemeMode = 'deep-black' | 'slate-gray' | 'light';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  inquiryType: 'collaboration' | 'internship' | 'job' | 'freelance' | 'general';
  message: string;
}
