import { Request, Response } from 'express';
import { suitcaseService } from '../services/suitcaseService.js';

export const suitcaseController = {
  async getSuitcases(req: Request, res: Response) {
    const suitcases = await suitcaseService.getAllSuitcases();
    res.status(200).json({ status: 'success', data: suitcases });
  },

  async getSuitcaseById(req: Request, res: Response) {
    const { id } = req.params;
    const suitcase = await suitcaseService.getSuitcaseById(id as string);
    res.status(200).json({ status: 'success', data: suitcase });
  },

  async createSuitcase(req: Request, res: Response) {
    const newSuitcase = await suitcaseService.createSuitcase(req.body);
    res.status(201).json({ status: 'success', data: newSuitcase });
  },

  async updateSuitcase(req: Request, res: Response) {
    const { id } = req.params;
    const updatedSuitcase = await suitcaseService.updateSuitcase(id as string, req.body);
    res.status(200).json({ status: 'success', data: updatedSuitcase });
  },

  async deleteSuitcase(req: Request, res: Response) {
    const { id } = req.params;
    const deletedSuitcase = await suitcaseService.deleteSuitcase(id as string);
    res.status(200).json({ status: 'success', data: deletedSuitcase });
  },
};