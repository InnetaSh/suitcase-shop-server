import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/userRepository.js';
import { RegisterUserDTO, LoginUserDTO } from '../types/auth.types.js';
import { jwtUtils } from '../lib/jwt.js';
import { ConflictException } from '../errors/ConflictException.js';
import { ErrorMessages } from '../constants/errorMessages.js';

export const authService = {
  async register(data: RegisterUserDTO) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException(ErrorMessages.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await userRepository.create({
      email: data.email,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  async login(data: LoginUserDTO) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const accessToken = jwtUtils.generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = jwtUtils.generateRefreshToken({ userId: user.id });

    await userRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  },

  async refreshTokens(incomingRefreshToken: string) {
    if (!incomingRefreshToken) {
      throw new Error('Refresh token is missing');
    }

    try {
      const payload = jwtUtils.verifyRefreshToken(incomingRefreshToken);
      const user = await userRepository.findById(payload.userId);

      if (!user || user.refreshToken !== incomingRefreshToken) {
        throw new Error('Invalid refresh token');
      }

      const accessToken = jwtUtils.generateAccessToken({ userId: user.id, email: user.email, role: user.role });
      const newRefreshToken = jwtUtils.generateRefreshToken({ userId: user.id });

      await userRepository.updateRefreshToken(user.id, newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  },

  async logout(userId: string) {
    await userRepository.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  },
};