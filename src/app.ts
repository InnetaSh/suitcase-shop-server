import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { correlationIdMiddleware } from './middlewares/correlationIdMiddleware.js';
import { requestLoggingMiddleware } from './middlewares/requestLoggingMiddleware.js';
import { exceptionMiddleware } from './middlewares/exceptionMiddleware.js';
import suitcaseRoutes from './routes/suitcaseRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(correlationIdMiddleware);
app.use(requestLoggingMiddleware);

app.use('/api/suitcases', suitcaseRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running!',
  });
});


app.use(exceptionMiddleware);

export default app;