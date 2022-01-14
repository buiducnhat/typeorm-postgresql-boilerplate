import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';

import { User } from '@src/entities/user.entity';
import { Social, SocialProvider } from '@src/entities/social.entity';
import { convertDto } from '@src/utils/common.util';
import { CreateSocialDto } from '@src/dto/social.dto';
import _ from 'lodash';

@Service()
export default class UserService {
  constructor(
    @Inject('userRepository') private userRepository: Repository<User>,
    @Inject('socialRepository') private socialRepository: Repository<Social>,
  ) {}

  public async findOne(userId): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.socials', 'social')
      .where('user.id = :userId', { userId })
      .getOne();
    return user;
  }

  public async findByEmail(email): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.socials', 'social')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  public async createSocial(
    userId: number | string,
    createSocialDto: CreateSocialDto,
  ): Promise<User> {
    const user = await this.findOne(userId);
    const social = new Social();
    convertDto(createSocialDto, social);
    user.socials.push(social);

    return this.userRepository.save(user);
  }

  public async findSocial(socialId: string, provider: SocialProvider) {
    const social = await this.socialRepository.findOne({ socialId, provider });
    if (social) {
      return { ...social, user: _.omit(social.user, ['password', 'salt']) };
    } else {
      return null;
    }
  }

  public async addSocialToUser(userId: number | string, socialUserId: number | string) {
    const socialUser = await this.socialRepository.findOne(socialUserId);
    const user = await this.findOne(userId);
    if (
      user.socials.some(
        social => social.id === socialUser.id && social.provider === socialUser.provider,
      )
    ) {
      return user;
    }
    user.socials.push(socialUser);
    return this.userRepository.save(user);
  }
}
