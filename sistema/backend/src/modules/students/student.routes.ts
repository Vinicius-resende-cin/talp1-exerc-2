import { Router } from 'express';
import { createStudent, listStudents, updateStudent, deleteStudent } from './student.controller';

export const studentsRouter = Router();

studentsRouter.get('/', listStudents);
studentsRouter.post('/', createStudent);
studentsRouter.put('/:id', updateStudent);
studentsRouter.delete('/:id', deleteStudent);
