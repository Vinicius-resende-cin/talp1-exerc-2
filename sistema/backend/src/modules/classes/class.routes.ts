import { Router } from 'express';
import { createClass, listClasses } from './class.controller';

export const classesRouter = Router();

classesRouter.get('/', listClasses);
classesRouter.post('/', createClass);
