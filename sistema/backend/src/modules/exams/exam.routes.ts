import { Router } from 'express';
import { createExam, listExams, updateExam, deleteExam } from './exam.controller';

export const examsRouter = Router();

examsRouter.get('/', listExams);
examsRouter.post('/', createExam);
examsRouter.put('/:id', updateExam);
examsRouter.delete('/:id', deleteExam);
