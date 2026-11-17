import { prisma } from '../lib/prisma.js';

export const suitcaseService = {
  async getAllSuitcases() {
    return await prisma.suitcase.findMany();
  },

  async createSuitcase(data: {
    title: string;
    brand: string;
    price: number;
    color: string;
    size: string;
    material: string;
    stock: number;
    imageUrl?: string;
  }) {
    return await prisma.suitcase.create({
      data,
    });
  },
};