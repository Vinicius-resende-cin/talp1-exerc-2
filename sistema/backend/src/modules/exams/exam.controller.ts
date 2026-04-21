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

export async function updateExam(req: Request, res: Response): Promise<void> {
  const updated = await service.updateExam(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Exam not found' });
    return;
  }
  res.status(200).json(updated);
}

export async function deleteExam(req: Request, res: Response): Promise<void> {
  const success = await service.deleteExam(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Exam not found' });
    return;
  }
  res.status(204).send();
}
