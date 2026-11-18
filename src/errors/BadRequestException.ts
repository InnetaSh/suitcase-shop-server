import { BaseException } from './BaseException.js';

export class BadRequestException extends Error {
  public statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}