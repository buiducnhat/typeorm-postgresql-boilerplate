import { Container } from 'typedi';
import { Strategy } from 'passport-facebook';

import config from '@src/config';
import AuthService from '@src/services/auth.service';
import { CreateSocialDto } from '@src/dto/social.dto';
import { SocialProvider } from '@src/entities/social.entity';

export const facebookStrategy = new Strategy(
  {
    clientID: config.facebook.appId,
    clientSecret: config.facebook.secretKey,
    callbackURL: `${config.host}/auth/facebook/redirect`,
    profileFields: ['id', 'email', 'name', 'photos'],
    enableProof: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const authService = Container.get(AuthService);
    const socialUser: CreateSocialDto = {
      socialId: profile.id,
      provider: SocialProvider.FACEBOOK,
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
