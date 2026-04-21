export interface Student {
  id?: string;
  name: string;
  cpf: string;
  email: string;
}

export type Grade = 'MANA' | 'MPA' | 'MA';

export interface Exam {
  id?: string;
  subject: string;
  grade: Grade;
  studentId: string;
}

export interface CourseClass {
  id?: string;
  subject: string;
  year: number;
  semester: number;
  students: string[];
}
