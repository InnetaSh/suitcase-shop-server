import { Request, Response } from 'express';
import { suitcaseService } from '../services/suitcaseService.js';

export const suitcaseController = {
  async getSuitcases(req: Request, res: Response) {
    try {
      const suitcases = await suitcaseService.getAllSuitcases();
      res.status(200).json({ status: 'success', data: suitcases });
    } catch (error) {
      console.error('Error fetching suitcases:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  },


  async createSuitcase(req: Request, res: Response) {
    try {
      const newSuitcase = await suitcaseService.createSuitcase(req.body);
      res.status(201).json({ status: 'success', data: newSuitcase });
    } catch (error) {
      console.error('Error creating suitcase:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  },
};