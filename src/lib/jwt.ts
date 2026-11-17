import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const jwtUtils = {
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
  },

  generateRefreshToken(payload: { userId: string }): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  },

  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
  },

  verifyRefreshToken(token: string): { userId: string } {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
  },
};