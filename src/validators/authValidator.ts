import { z } from 'zod';
import { ErrorMessages } from '../constants/errorMessages.js';

export const registerSchema = z.object({
    email: z.email(ErrorMessages.INVALID_EMAIL),
    password: z.string().min(6, ErrorMessages.PASSWORD_MIN_LENGTH),
    fullName: z.string().min(2, ErrorMessages.FULL_NAME_SHORT).optional(),
    role: z.enum(['ADMIN', 'CUSTOMER']).optional(),
});

export const loginSchema = z.object({
    email: z.email(ErrorMessages.INVALID_EMAIL),
    password: z.string().min(1, ErrorMessages.PASSWORD_REQUIRED),
});