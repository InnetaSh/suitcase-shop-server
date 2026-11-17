import { Request, Response } from 'express';
import { authService } from '../services/authService.js';

export const authController = {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);
    res.status(201).json({ status: 'success', data: user });
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    res.status(200).json({ status: 'success', data: result });
  },

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshTokens(refreshToken);
    res.status(200).json({ status: 'success', data: tokens });
  },

  async logout(req: Request, res: Response) {
    const userId = (req as any).user?.userId; 
    
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const result = await authService.logout(userId);
    res.status(200).json({ status: 'success', data: result });
  },
};