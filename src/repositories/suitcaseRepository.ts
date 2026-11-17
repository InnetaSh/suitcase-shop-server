import { prisma } from '../lib/prisma.js';
import { CreateSuitcaseDTO, UpdateSuitcaseDTO } from '../types/suitcase.types.js';

export const suitcaseRepository = {
  async findAll() {
    return await prisma.suitcase.findMany();
  },

  async findById(id: string) {
    return await prisma.suitcase.findUnique({
      where: { id },
    });
  },

  async findBySku(sku: string) {
    return await prisma.suitcase.findUnique({
      where: { sku },
    });
  },

  async create(data: CreateSuitcaseDTO) {
    return await prisma.suitcase.create({
      data: {
        ...data,
        sku: data.sku as string,
      },
    });
  },

  async update(id: string, data: UpdateSuitcaseDTO) {
    return await prisma.suitcase.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.suitcase.delete({
      where: { id },
    });
  },
};