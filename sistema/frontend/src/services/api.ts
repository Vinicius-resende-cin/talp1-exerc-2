import { Student } from '../types/student';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3001/api/v1';

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

export async function getExams(): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}/exams`);
  return response.json();
}
