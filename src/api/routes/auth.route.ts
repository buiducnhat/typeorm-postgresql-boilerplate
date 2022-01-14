import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';

import authValidators from '@src/api/middlewares/validators/auth.validator';
import AuthService from '@src/services/auth.service';
import { CreateUserDto } from '@src/dto/user.dto';
import passport from '@src/api/passport';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    authValidators.signUp,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.signUp(req.body as CreateUserDto);
        return res.status(201).json(result);
      } catch (err) {
        next(err);
      }
    },
  );

  route.post(
    '/signin',
    authValidators.signIn,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password, remember } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.signIn(email, password, remember);
        return res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    },
  );

  route.get('/google', passport.authenticate('google'));

  route.get(
    '/google/redirect',
    passport.authenticate('google', { session: false }),
    (req: Request, res: Response) => {
      res.status(200).json(req.user);
    },
  );

  route.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  route.get(
    '/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    (req: Request, res: Response) => {
      res.status(200).json(req.user);
    },
  );
};
