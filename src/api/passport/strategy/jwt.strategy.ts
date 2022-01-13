import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Container } from 'typedi';

import config from '@src/config';
import UserService from '@src/services/user.service';
import { UnauthorizedException } from '@src/config/custom-error.config';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.jwtSecret,
  algorithms: [config.jwt.jwtAlgorithm],
};

export const jwtStrategy = new Strategy(options, async (payload, done) => {
  const { userId } = payload;
  try {
    const userServiceInstance = Container.get(UserService);

    const user = await userServiceInstance.findOne(userId);
    if (!user) {
      return done(null, false, new UnauthorizedException('Verification failed'));
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
