import { Router } from 'express';

import authApi from './routes/auth.route';
import userApi from './routes/user.route';

import setupSwagger from './setup-swagger';

export default () => {
  const app = Router();

  setupSwagger(app);

  authApi(app);
  userApi(app);

  return app;
};
