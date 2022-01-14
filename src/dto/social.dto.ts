import { SocialProvider } from '@src/entities/social.entity';

export interface CreateSocialDto {
  socialId: string;
  provider: SocialProvider;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  phone?: string;
}
