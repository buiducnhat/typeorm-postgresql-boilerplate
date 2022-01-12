import { Request, Response, NextFunction } from 'express';

import {} from '@src/types/express';
import { ForbiddenException } from '@src/config/custom-error.config';

export const checkRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser || !req.currentUser.role) {
      req.hasPermission = false;
    } else {
      req.hasPermission = roles.includes(req.currentUser.role);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const checkPermission = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.hasPermission) {
      throw new ForbiddenException('checkPermission', 'No permissions to do this action');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
