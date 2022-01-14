import passport from 'passport';

import { jwtStrategy } from './strategy/jwt.strategy';
import { googleStrategy } from './strategy/google.strategy';
import { facebookStrategy } from './strategy/facebook.strategy';

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

export default passport;
