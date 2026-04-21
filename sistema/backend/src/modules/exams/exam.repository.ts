import { Exam } from '../../types';
import { ExamModel } from './exam.model';

export class ExamRepository {
  async create(payload: Exam): Promise<Exam> {
    const created = await ExamModel.create(payload);

    return {
      id: created.id,
      title: created.title,
      subject: created.subject,
      date: created.date,
      maxScore: created.maxScore,
      studentId: created.studentId
    };
  }

  async findAll(): Promise<Exam[]> {
    const docs = await ExamModel.find().lean();

    return docs.map((doc) => ({
      id: String(doc._id),
      title: doc.title,
      subject: doc.subject,
      date: doc.date,
      maxScore: doc.maxScore,
      studentId: doc.studentId
    }));
  }
}
