import { Exam } from '../../types';
import { ExamRepository } from './exam.repository';

export class ExamService {
  constructor(private readonly repository: ExamRepository) {}

  async createExam(payload: Exam): Promise<Exam> {
    return this.repository.create(payload);
  }

  async listExams(): Promise<Exam[]> {
    return this.repository.findAll();
  }

  async updateExam(id: string, payload: Partial<Exam>): Promise<Exam | null> {
    return this.repository.update(id, payload);
  }

  async deleteExam(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
