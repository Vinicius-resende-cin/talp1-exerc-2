import { Router } from 'express';
import { createStudent, listStudents } from './student.controller';

export const studentsRouter = Router();

studentsRouter.get('/', listStudents);
studentsRouter.post('/', createStudent);
