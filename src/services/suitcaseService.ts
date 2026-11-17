import { suitcaseRepository } from '../repositories/suitcaseRepository.js';
import { CreateSuitcaseDTO, UpdateSuitcaseDTO } from '../types/suitcase.types.js';
import { NotFoundException } from '../errors/NotFoundException.js';
import { ConflictException } from '../errors/ConflictException.js';
import { ErrorMessages } from '../constants/errorMessages.js';
import { generateSku } from '../utils/skuGenerator.js';

export const suitcaseService = {
  async getAllSuitcases() {
    return await suitcaseRepository.findAll();
  },

  async getSuitcaseById(id: string) {

    const existingSuitcase = await suitcaseRepository.findById(id);

    if (!existingSuitcase) {
      throw new NotFoundException(ErrorMessages.SUITCASE_NOT_FOUND);
    }

    return existingSuitcase;
  },

  async createSuitcase(data: CreateSuitcaseDTO) {
   const generatedSku = generateSku(data.title, data.size ?? "", data.color ?? "");

    const existingSuitcase = await suitcaseRepository.findBySku(generatedSku);
    
    if (existingSuitcase) {
      throw new ConflictException(ErrorMessages.SUITCASE_ALREADY_EXISTS);
    }
    const suitcaseData = {
      ...data,
      sku: generatedSku,
    };

    return await suitcaseRepository.create(suitcaseData);
  },

  async updateSuitcase(id: string, data: UpdateSuitcaseDTO) {
    const existingSuitcase = await suitcaseRepository.findById(id);

    if (!existingSuitcase) {
      throw new NotFoundException(ErrorMessages.SUITCASE_NOT_FOUND);
    }

    return await suitcaseRepository.update(id, data);
  },

  async deleteSuitcase(id: string) {
    const existingSuitcase = await suitcaseRepository.findById(id);

    if (!existingSuitcase) {
      throw new NotFoundException(ErrorMessages.SUITCASE_NOT_FOUND);
    }

    return await suitcaseRepository.delete(id);
  },
};