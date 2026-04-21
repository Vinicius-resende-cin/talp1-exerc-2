import { Request, Response } from 'express';
import { ClassRepository } from './class.repository';
import { ClassService } from './class.service';

const service = new ClassService(new ClassRepository());

export async function createClass(req: Request, res: Response): Promise<void> {
  const created = await service.createClass(req.body);
  res.status(201).json(created);
}

export async function listClasses(_req: Request, res: Response): Promise<void> {
  const classes = await service.listClasses();
  res.status(200).json(classes);
}
