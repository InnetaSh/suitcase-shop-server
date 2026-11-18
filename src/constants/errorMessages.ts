export const ErrorMessages = {
    USER_NOT_FOUND: 'User with the given ID was not found.',

    INVALID_EMAIL: 'Invalid email format',
    EMAIL_ALREADY_EXISTS: 'User with this email already exists',
    USER_ALREADY_EXISTS: 'User already exists',

    ACCESS_TOKEN_MISSING: 'Access token is missing',
    INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired access token',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Access forbidden: insufficient rights',

    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters long',
    PASSWORD_REQUIRED: 'Password is required',
    FULL_NAME_SHORT: 'Full name is too short',

    SUITCASE_NOT_FOUND: 'Suitcase not found',
    SUITCASE_ALREADY_EXISTS: 'Suitcase already exists',

     ORDER_NOT_FOUND: 'Order not found',
} as const;