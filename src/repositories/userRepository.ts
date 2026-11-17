import { prisma } from '../lib/prisma.js';
import { RegisterUserDTO } from '../types/auth.types.js';

export const userRepository = {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  async create(data: RegisterUserDTO) {
    return await prisma.user.create({
      data,
    });
  },

  async updateRefreshToken(id: string, refreshToken: string | null) {
    return await prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  },
};