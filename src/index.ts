import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import { prisma } from './lib/prisma.js';
import suitcaseRoutes from './routes/suitcaseRoutes.js';
import authRoutes from './routes/authRoutes.js';


import { correlationIdMiddleware } from './middlewares/correlationIdMiddleware.js';
import { requestLoggingMiddleware } from './middlewares/requestLoggingMiddleware.js';
import { exceptionMiddleware } from './middlewares/exceptionMiddleware.js';
import { authLimiter } from './middlewares/rateLimiter.js';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(correlationIdMiddleware);
app.use(requestLoggingMiddleware);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/suitcases', suitcaseRoutes);

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'success',
      message: 'Server is running and connected to PostgreSQL database!',
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
});

app.use(exceptionMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});