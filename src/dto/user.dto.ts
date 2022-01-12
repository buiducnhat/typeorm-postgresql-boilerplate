import { User } from '@src/entities/user.entity';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export type UserBasicDto = Omit<User, 'password' | 'salt'>;
