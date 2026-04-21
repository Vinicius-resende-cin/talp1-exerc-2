import { Exam } from '../../types';
import { ExamModel } from './exam.model';

export class ExamRepository {
  async create(payload: Exam): Promise<Exam> {
    const created = await ExamModel.create(payload);

    return {
      id: created.id,
      subject: created.subject,
      grade: created.grade as any,
      studentId: created.studentId
    };
  }

  async findAll(): Promise<Exam[]> {
    const docs = await ExamModel.find().lean();

    return docs.map((doc) => ({
      id: String(doc._id),
      subject: doc.subject,
      grade: doc.grade as any,
      studentId: doc.studentId
    }));
  }
}
