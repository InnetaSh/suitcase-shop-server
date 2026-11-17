import { Request, Response, NextFunction } from 'express';
import { jwtUtils } from '../lib/jwt.js';
import { UnauthorizedException } from '../errors/UnauthorizedException.js';
import { ErrorMessages } from '../constants/errorMessages.js';
import { ForbiddenException } from '../errors/ForbiddenException.js';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException(ErrorMessages.ACCESS_TOKEN_MISSING);
        }

        const token = authHeader.split(' ')[1];
        const payload = jwtUtils.verifyAccessToken(token);

        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof UnauthorizedException) {
            return next(error);
        }

        return next(
            new UnauthorizedException(ErrorMessages.INVALID_OR_EXPIRED_TOKEN)
        );
    }
};

export const requireRole = (role: string) => {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return next(
                new UnauthorizedException(ErrorMessages.UNAUTHORIZED)
            );
        }

        if (req.user.role !== role) {
            return next(
                new ForbiddenException(ErrorMessages.FORBIDDEN)
            );
        }

        next();
    };
};