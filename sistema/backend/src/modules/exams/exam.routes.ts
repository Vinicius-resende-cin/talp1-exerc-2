import { Router } from 'express';
import { createExam, listExams } from './exam.controller';

export const examsRouter = Router();

examsRouter.get('/', listExams);
examsRouter.post('/', createExam);
