import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import * as _ from 'lodash';

import config from '@src/config';
import { User } from '@src/entities/user.entity';
import { ChangePasswordDto, CreateUserDto, UserBasicDto } from '@src/dto/user.dto';
import { randomBytes } from 'crypto';
import {
  BadRequestException,
  GenericException,
  UnauthorizedException,
} from '@src/config/custom-error.config';
import { convertDto, generateAvatar } from '@src/utils/common.util';

@Service()
export default class AuthService {
  serviceName: string;

  constructor(@Inject('userRepository') private userRepository: Repository<User>) {}

  public async signUp(userInputDto: CreateUserDto): Promise<{ user: UserBasicDto; token: string }> {
    // Check if email is already existed
    if (await this.checkExistUser(userInputDto.email)) {
      throw new BadRequestException('signUp', 'This email already exists');
    }

    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(userInputDto.password, { salt });

    const newUser: User = new User();
    convertDto(userInputDto, newUser);
    newUser.salt = salt.toString('hex');
    newUser.password = hashedPassword;
    if (!newUser.avatar) {
      newUser.avatar = await generateAvatar(userInputDto.firstName, userInputDto.lastName);
    }

    const user = await this.userRepository.save(newUser);

    if (!user) {
      throw new GenericException('signUp');
    }
    const token = this.generateToken(user);

    return { token, user: _.omit(user, ['password', 'salt']) };
  }

  public async signIn(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<{ user: UserBasicDto; token: string }> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('signIn', 'User with email not found');
    }

    // We use verify from argon2 to prevent 'timing based' attacks
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      const token = this.generateToken(user, remember);
      return { token, user: _.omit(user, ['password', 'salt']) };
    } else {
      throw new UnauthorizedException('signIn', 'Wrong password');
    }
  }

  private async checkExistUser(email: string): Promise<boolean> {
    const userCount = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getCount();

    return userCount > 0;
  }

  public async changePassword(
    userId: number | string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserBasicDto> {
    let user = await this.userRepository.findOne(userId);

    // compare oldPassword with password in db
    const validPassword = await argon2.verify(user.password, changePasswordDto.oldPassword);
    if (!validPassword) {
      throw new UnauthorizedException('changePassword', 'Wrong password');
    }

    // hash newPassword
    user.password = await argon2.hash(changePasswordDto.newPassword, {
      salt: Buffer.from(user.salt),
    });
    user = await this.userRepository.save(user);
    return _.omit(user, ['password', 'salt']);
  }

  private generateToken(user: User, isLongExpire = false) {
    const jwtAlgorithm = config.jwtAlgorithm;
    return jwt.sign(
      {
        id: user.id,
      },
      config.jwtSecret,
      {
        algorithm: jwtAlgorithm,
        expiresIn: isLongExpire ? config.jwtExpireTimeLong : config.jwtExpireTimeNormal,
      },
    );
  }
}
