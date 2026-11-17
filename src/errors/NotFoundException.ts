import { BaseException } from './BaseException.js';

export class NotFoundException extends BaseException {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}