import passport from 'passport';
import { jwtStrategy } from './strategy/jwt.strategy';

passport.use(jwtStrategy);

export default passport;
