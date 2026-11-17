import { BaseException } from './BaseException.js';

export class ConflictException extends BaseException {
  constructor(message: string = 'Resource already exists') {
    super(409, message);
  }
}