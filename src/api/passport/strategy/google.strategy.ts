import { Container } from 'typedi';
import { Strategy } from 'passport-google-oauth20';

import config from '@src/config';
import AuthService from '@src/services/auth.service';
import { CreateSocialDto } from '@src/dto/social.dto';
import { SocialProvider } from '@src/entities/social.entity';

export const googleStrategy = new Strategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: `${config.host}/auth/google/redirect`,
    scope: ['email', 'profile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    const authService = Container.get(AuthService);
    const socialUser: CreateSocialDto = {
      socialId: profile.id,
      provider: SocialProvider.GOOGLE,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0].value,
      phone: null,
    };

    const result = await authService.signInWithSocial(socialUser);

    done(null, result);
  },
);
