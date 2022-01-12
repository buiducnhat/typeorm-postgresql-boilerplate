import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import config from '@src/config';
import { GenericException } from '@src/config/custom-error.config';

const isOptionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new JsonWebTokenError('No token found');
    }
    const splited = auth.split(' ');
    if (splited.length !== 2) {
      throw new JsonWebTokenError('Invalid Token');
    }
    if (splited[0] === 'Token' || splited[0] === 'Bearer') {
      const token = splited[1];
      const decoded = jwt.verify(token, config.jwtSecret);
      req.token = decoded as { id: number };
      next();
    } else {
      throw new JsonWebTokenError('isOptionalAuth');
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      req.token = null;
      next();
    } else {
      throw new GenericException('isOptionalAuth');
    }
  }
};

export default isOptionalAuth;
