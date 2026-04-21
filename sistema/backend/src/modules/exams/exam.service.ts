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
}
