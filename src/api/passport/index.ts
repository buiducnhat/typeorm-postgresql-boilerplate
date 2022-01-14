import passport from 'passport';

import { jwtStrategy } from './strategy/jwt.strategy';
import { googleStrategy } from './strategy/google.strategy';

passport.use(jwtStrategy);
passport.use(googleStrategy);

export default passport;
