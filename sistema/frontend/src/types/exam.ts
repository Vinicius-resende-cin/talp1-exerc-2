export type Grade = 'MANA' | 'MPA' | 'MA';

export interface Exam {
  id?: string;
  subject: string;
  grade: Grade;
  studentId: string;
}
