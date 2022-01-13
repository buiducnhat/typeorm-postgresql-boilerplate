import { User as UserEntity } from '@src/entities/user.entity';

declare global {
  namespace Express {
    export interface Request {
      token: {
        id: number | string;
      };
      currentUser: Partial<UserEntity>;
      hasPermission: boolean;
    }
  }
}
