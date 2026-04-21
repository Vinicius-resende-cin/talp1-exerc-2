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

  async update(id: string, payload: Partial<Exam>): Promise<Exam | null> {
    const updated = await ExamModel.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (!updated) return null;
    return {
      id: String(updated._id),
      subject: updated.subject,
      grade: updated.grade as any,
      studentId: updated.studentId
    };
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ExamModel.findByIdAndDelete(id).lean();
    return !!deleted;
  }
}
