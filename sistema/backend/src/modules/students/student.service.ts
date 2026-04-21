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
}
