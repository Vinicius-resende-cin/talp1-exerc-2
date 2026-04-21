import { Request, Response } from 'express';
import { ExamRepository } from './exam.repository';
import { ExamService } from './exam.service';

const service = new ExamService(new ExamRepository());

export async function createExam(req: Request, res: Response): Promise<void> {
  const created = await service.createExam(req.body);
  res.status(201).json(created);
}

export async function listExams(_req: Request, res: Response): Promise<void> {
  const exams = await service.listExams();
  res.status(200).json(exams);
}
