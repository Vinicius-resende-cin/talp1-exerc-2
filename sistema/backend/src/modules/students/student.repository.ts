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
}
