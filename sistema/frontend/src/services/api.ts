const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3001/api/v1';

export async function getStudents(): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}/students`);
  return response.json();
}

export async function getExams(): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}/exams`);
  return response.json();
}
