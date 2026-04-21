import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler';
import { apiRouter } from './routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1', apiRouter);
app.use(errorHandler);
