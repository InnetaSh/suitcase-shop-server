import { BaseException } from './BaseException.js';

export class ForbiddenException extends BaseException {
  constructor(message: string = 'Forbidden') {
    super(403, message);
  }
}