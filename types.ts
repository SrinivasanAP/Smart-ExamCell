export enum BloomsLevel {
  REMEMBER = 'Remember',
  UNDERSTAND = 'Understand',
  APPLY = 'Apply',
  ANALYZE = 'Analyze',
  EVALUATE = 'Evaluate',
  CREATE = 'Create'
}

export interface QuestionPaperAnalysis {
  bloomsDistribution: { [key in BloomsLevel]?: number };
  syllabusCoverage: number;
  qualityScore: number;
  suggestions: string[];
  missingTopics: string[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
}

export interface ExamDuty {
  id: string;
  facultyName: string;
  date: string;
  time: string;
  hall: string;
  status: 'Assigned' | 'Confirmed' | 'Completed';
}

export interface SeatingRow {
  id: string;
  hallName: string;
  capacity: number;
  allocated: number;
  status: 'Full' | 'Available' | 'Maintenance';
}

export interface PaperSubmission {
  id: string;
  courseId: string;
  facultyName: string;
  set: 'A' | 'B';
  submissionDate: string;
  status: 'Pending' | 'submitted' | 'Verified' | 'Rejected';
  analysis?: QuestionPaperAnalysis;
  content?: string;
}
