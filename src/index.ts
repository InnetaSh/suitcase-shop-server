import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import { prisma } from './lib/prisma.js';
import suitcaseRoutes from './routes/suitcaseRoutes.js';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});