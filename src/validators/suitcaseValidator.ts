import { z } from 'zod';

export const createSuitcaseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  price: z.number().positive('Price must be a positive number'),
  brand: z.string().min(2, 'Brand is required'),
  color: z.string().min(2, 'Color is required'),
  material: z.string().min(2, 'Material is required'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer').optional(),
});

export const updateSuitcaseSchema = createSuitcaseSchema.partial();