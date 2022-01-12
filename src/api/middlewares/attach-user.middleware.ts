import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import * as _ from 'lodash';
import { Repository } from 'typeorm';

import {} from '@src/types/express';
import { User } from '@src/entities/user.entity';
import { UnauthorizedException } from '@src/config/custom-error.config';

const attachCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.token) {
      req.currentUser = null;
      return next();
    }

    const userRepository = Container.get('userRepository') as Repository<User>;

    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: req.token.id })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Authorize user fail');
    }
    req.currentUser = _.omit(user, ['password', 'salt']);
    req.hasPermission = true;
    next();
  } catch (error) {
    return next(error);
  }
};

export default attachCurrentUser;
