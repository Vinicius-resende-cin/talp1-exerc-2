export interface Student {
  id?: string;
  name: string;
  email: string;
  registrationNumber: string;
  status: 'active' | 'inactive';
}

export interface Exam {
  id?: string;
  title: string;
  subject: string;
  date: string;
  maxScore: number;
  studentId: string;
}
