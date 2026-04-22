import { CourseClass } from '../../types';
import { CourseClassModel } from './class.model';

export class ClassRepository {
  async create(payload: CourseClass): Promise<CourseClass> {
    const created = await CourseClassModel.create(payload);

    return {
      id: String(created._id),
      subject: created.subject,
      year: created.year,
      semester: created.semester,
      students: created.students
    };
  }

  async findAll(): Promise<CourseClass[]> {
    const docs = await CourseClassModel.find().lean();

    return docs.map((doc) => ({
      id: String(doc._id),
      subject: doc.subject,
      year: doc.year,
      semester: doc.semester,
      students: doc.students || []
    }));
  }

  async delete(id: string): Promise<void> {
    await CourseClassModel.findByIdAndDelete(id);
  }

  async addStudent(classId: string, studentId: string): Promise<void> {
    await CourseClassModel.findByIdAndUpdate(classId, {
      $addToSet: { students: studentId }
    });
  }
}
