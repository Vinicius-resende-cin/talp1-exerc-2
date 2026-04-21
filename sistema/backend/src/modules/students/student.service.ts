import { Student } from '../../types';
import { StudentRepository } from './student.repository';

export class StudentService {
  constructor(private readonly repository: StudentRepository) {}

  async createStudent(payload: Student): Promise<Student> {
    return this.repository.create(payload);
  }

  async listStudents(): Promise<Student[]> {
    return this.repository.findAll();
  }

  async updateStudent(id: string, payload: Partial<Student>): Promise<Student | null> {
    return this.repository.update(id, payload);
  }

  async deleteStudent(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
