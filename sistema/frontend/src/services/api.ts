import { Student } from '../types/student';

import { Exam } from '../types/exam';

const apiBaseUrl = 'http://localhost:3001/api/v1';

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(`${apiBaseUrl}/students`);
  return response.json();
}

export async function createStudent(student: Omit<Student, 'id'>): Promise<Student> {
  const response = await fetch(`${apiBaseUrl}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });
  return response.json();
}

export async function updateStudent(id: string, student: Partial<Student>): Promise<Student> {
  const response = await fetch(`${apiBaseUrl}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });
  return response.json();
}

export async function deleteStudent(id: string): Promise<void> {
  await fetch(`${apiBaseUrl}/students/${id}`, {
    method: 'DELETE'
  });
}

export async function getExams(): Promise<Exam[]> {
  const response = await fetch(`${apiBaseUrl}/exams`);
  return response.json();
}

export async function createExam(exam: Omit<Exam, 'id'>): Promise<Exam> {
  const response = await fetch(`${apiBaseUrl}/exams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exam)
  });
  return response.json();
}

export async function updateExam(id: string, exam: Partial<Exam>): Promise<Exam> {
  const response = await fetch(`${apiBaseUrl}/exams/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exam)
  });
  return response.json();
}

export async function deleteExam(id: string): Promise<void> {
  await fetch(`${apiBaseUrl}/exams/${id}`, {
    method: 'DELETE'
  });
}
