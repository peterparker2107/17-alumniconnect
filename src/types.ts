export type CompanyName =
  | 'Google'
  | 'Microsoft'
  | 'DE Shaw'
  | 'Bain & Company'
  | 'McKinsey & Company'
  | 'Amazon'
  | 'Goldman Sachs'
  | 'Uber'
  | 'Apple'
  | 'Nvidia'

export type EngineeringBranch = 'COE' | 'ENC' | 'EEC' | 'MECH' | 'CHE' | 'Biotech' | 'Civil'

export type CareerDomain =
  | 'Software Engineering'
  | 'Quant & HFT'
  | 'Product Management'
  | 'Management Consulting'
  | 'Machine Learning & AI'
  | 'Cloud Infrastructure'

export interface Alumnus {
  id: string
  name: string
  batch: number
  branch: EngineeringBranch
  company: CompanyName
  role: string
  location: string
  avatarUrl: string
  domain: CareerDomain
  bio: string
  tietSociety?: string
  responseRate: string
  linkedInHandle: string
  verified: boolean
  slotsAvailable: number
  skills: string[]
  referralsSupported: boolean
}

export interface InterviewBooking {
  id: string
  alumnusId: string
  alumnusName: string
  alumnusRole: string
  company: string
  track: 'Coding & DSA' | 'System Design' | 'Behavioral & Leadership' | 'Product Sense' | 'Case Study Consulting'
  scheduledDate: string
  scheduledTime: string
  meetLink: string
  status: 'confirmed' | 'completed' | 'rescheduled'
  notes?: string
}

export interface ReferralRequest {
  id: string
  alumnusName: string
  company: string
  jobTitle: string
  jobId: string
  matchScore: number
  pitchText: string
  resumeUrl: string
  status: 'draft' | 'submitted' | 'under_review' | 'referral_placed' | 'interview_scheduled'
  submittedAt: string
  tietSocietyReferenced?: string
}

export interface AmaPost {
  id: string
  studentName: string
  studentBranch: string
  question: string
  category: string
  upvotes: number
  createdAt: string
  answer?: {
    alumnusName: string
    alumnusRole: string
    company: string
    batch: number
    text: string
    answeredAt: string
  }
}

export interface MentorshipRequest {
  id: string
  alumnusId: string
  alumnusName: string
  company: string
  topic: string
  message: string
  preferredSchedule: string
  status: 'pending' | 'accepted' | 'scheduled'
  createdAt: string
}
