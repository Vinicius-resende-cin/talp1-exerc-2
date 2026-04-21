import { Router } from 'express';
import { examsRouter } from '../modules/exams/exam.routes';
import { studentsRouter } from '../modules/students/student.routes';

export const apiRouter = Router();

apiRouter.use('/students', studentsRouter);
apiRouter.use('/exams', examsRouter);
