import { HttpCode, HttpStatus } from '@src/config/constants';

export class CustomError extends Error {
  status: number;
  code: string;
  name: string;

  constructor(name = 'Error', code = HttpCode.GENERIC, status = HttpStatus.GENERIC, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = name;
    this.code = code;
    this.status = status;
  }
}

export class BadRequestException extends CustomError {
  constructor(name = 'Error', ...params) {
    super(name, HttpCode.BAD_REQUEST, HttpStatus.BAD_REQUEST, ...params);
  }
}

export class UnauthorizedException extends CustomError {
  constructor(name = 'Error', ...params) {
    super(name, HttpCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, ...params);
  }
}

export class ForbiddenException extends CustomError {
  constructor(name = 'Error', ...params) {
    super(name, HttpCode.FORBIDDEN, HttpStatus.FORBIDDEN, ...params);
  }
}

export class NotFoundException extends CustomError {
  constructor(name = 'Error', ...params) {
    super(name, HttpCode.NOT_FOUND, HttpStatus.NOT_FOUND, ...params);
  }
}

export class GenericException extends CustomError {
  constructor(name = 'Error', ...params) {
    super(name, HttpCode.GENERIC, HttpStatus.GENERIC, ...params);
  }
}
