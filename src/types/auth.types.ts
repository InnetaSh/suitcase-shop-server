export interface RegisterUserDTO {
  email: string;
  password: string;
  fullName?: string;
  role?: 'ADMIN' | 'CUSTOMER';
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
}

export interface AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDTO;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}