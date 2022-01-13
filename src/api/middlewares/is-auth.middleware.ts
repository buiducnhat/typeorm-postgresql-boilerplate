import { Request, Response, NextFunction } from 'express';

import passport from '@src/api/passport';
import { GenericException, UnauthorizedException } from '@src/config/custom-error.config';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(new GenericException('Error', err));
    }
    if (info) {
      return next(new UnauthorizedException('Verification failed', info));
    }
    req.currentUser = user;
    req.hasPermission = true;

    return next();
  })(req, res, next);
};

export const isOptionalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(new GenericException('Error', err));
    }

    req.currentUser = user || null;
    req.hasPermission = true;

    return next();
  })(req, res, next);
};
