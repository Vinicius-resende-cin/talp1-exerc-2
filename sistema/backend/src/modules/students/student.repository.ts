import { Student } from '../../types';
import { StudentModel } from './student.model';

export class StudentRepository {
  async create(payload: Student): Promise<Student> {
    const created = await StudentModel.create(payload);

    return {
      id: created.id,
      name: created.name,
      cpf: created.cpf,
      email: created.email
    };
  }

  async findAll(): Promise<Student[]> {
    const docs = await StudentModel.find().lean();

    return docs.map((doc) => ({
      id: String(doc._id),
      name: doc.name,
      cpf: doc.cpf,
      email: doc.email
    }));
  }

  async update(id: string, payload: Partial<Student>): Promise<Student | null> {
    const updated = await StudentModel.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (!updated) return null;
    return {
      id: String(updated._id),
      name: updated.name,
      cpf: updated.cpf,
      email: updated.email
    };
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await StudentModel.findByIdAndDelete(id).lean();
    return !!deleted;
  }
}
