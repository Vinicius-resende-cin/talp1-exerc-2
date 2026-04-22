import { Router } from 'express';
import { createClass, listClasses, deleteClass, addStudent } from './class.controller';

export const classesRouter = Router();

classesRouter.get('/', listClasses);
classesRouter.post('/', createClass);
classesRouter.delete('/:id', deleteClass);
classesRouter.post('/:id/students', addStudent);
