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
