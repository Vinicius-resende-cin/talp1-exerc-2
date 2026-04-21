import { Request, Response } from 'express';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

const service = new StudentService(new StudentRepository());

export async function createStudent(req: Request, res: Response): Promise<void> {
  const created = await service.createStudent(req.body);
  res.status(201).json(created);
}

export async function listStudents(_req: Request, res: Response): Promise<void> {
  const students = await service.listStudents();
  res.status(200).json(students);
}

export async function updateStudent(req: Request, res: Response): Promise<void> {
  const updated = await service.updateStudent(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  res.status(200).json(updated);
}

export async function deleteStudent(req: Request, res: Response): Promise<void> {
  const success = await service.deleteStudent(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  res.status(204).send();
}
