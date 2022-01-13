import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';

import { User } from '@src/entities/user.entity';

@Service()
export default class UserService {
  constructor(@Inject('userRepository') private userRepository: Repository<User>) {}

  public async findOne(userId) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
    return user;
  }
}
