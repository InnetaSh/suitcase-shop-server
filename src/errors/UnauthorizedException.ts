import { BaseException } from './BaseException.js';

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}