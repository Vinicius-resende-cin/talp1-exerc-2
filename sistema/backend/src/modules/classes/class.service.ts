import { CourseClass } from '../../types';
import { ClassRepository } from './class.repository';

export class ClassService {
  constructor(private readonly repository: ClassRepository) {}

  async createClass(payload: CourseClass): Promise<CourseClass> {
    return this.repository.create(payload);
  }

  async listClasses(): Promise<CourseClass[]> {
    return this.repository.findAll();
  }

  async deleteClass(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async addStudent(classId: string, studentId: string): Promise<void> {
    return this.repository.addStudent(classId, studentId);
  }
}
